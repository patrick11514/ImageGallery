import { json } from '@sveltejs/kit'
import type { UserLogin } from '../../../types/request'
import type { RequestHandler } from './$types'
import type { LoginResponse, Response } from '../../../types/response'
import { connection as conn } from '$lib/server/mysql'
import { comparePass } from '$lib/server/funcs'
import { setCookie, updateCookie } from '$lib/server/cookies/main'
import type { User } from '../../../types/types'
import crypto from 'crypto'

//expire afte 10 minutes
const cookieExpire = 1000 * 60 * 10

export const POST = (async ({ request, cookies }) => {
    const data = (await request.json()) as UserLogin

    const user = await conn.query<
        {
            password: string
            name: string
            color: string
            email: string
        }[]
    >(
        'SELECT `password`, `name`, `color`, `email` FROM `users` INNER JOIN `groups` ON `users`.`group_name` = `groups`.`name` WHERE `users`.`username` = ?;',
        [data.username]
    )

    if (user.length > 0) {
        const hash = user[0].password
        if (comparePass(data.password, hash)) {
            const userData = {
                role: {
                    name: user[0].name,
                    color: user[0].color
                },
                admin: user[0].name == 'admin',
                hash: crypto.createHash('md5').update(user[0].email).digest('hex'),
                username: data.username
            } satisfies User

            const currentCookie = cookies.get('session')
            let cookie: string
            if (currentCookie) {
                cookie = updateCookie<User>(currentCookie, userData, cookieExpire)
            } else {
                cookie = setCookie<User>(userData, cookieExpire)
            }

            cookies.set('session', cookie, {
                path: '/',
                maxAge: cookieExpire / 1000
            })

            return json({
                status: true,
                data: userData
            } satisfies LoginResponse)
        }
        return json({
            status: false,
            error: 'Invalid password'
        } satisfies Response)
    }

    return json({
        status: false,
        error: 'Invalid username'
    } satisfies Response)
}) satisfies RequestHandler
