import { json, redirect } from '@sveltejs/kit'
import type { UserLogin } from '../../../types/request'
import type { RequestHandler } from './$types'
import type { LoginResponse, Response } from '../../../types/response'
import { connection as conn } from '$lib/server/mysql'
import { comparePass } from '$lib/server/funcs'

export const POST = (async ({ request }) => {
    const data = (await request.json()) as UserLogin

    const user = await conn.query<
        {
            password: string
            name: string
            color: string
        }[]
    >(
        'SELECT `password`, `name`, `color` FROM `users` INNER JOIN `groups` ON `users`.`group_name` = `groups`.`name` WHERE `users`.`username` = ?;',
        [data.username]
    )

    if (user.length > 0) {
        const hash = user[0].password
        if (comparePass(data.password, hash)) {
            return json({
                status: true,
                data: {
                    role: {
                        name: user[0].name,
                        color: user[0].color
                    },
                    admin: user[0].name == 'admin'
                }
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
