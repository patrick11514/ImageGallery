import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import type { User } from '$types/types'
import { jwt } from '$lib/server/vars'

export const GET = (async ({ cookies }) => {
    const cookie = cookies.get('session')
    if (cookie) {
        const user = jwt.getCookie<User | undefined>(cookie)
        if (!user) {
            return json({
                status: false
            })
        }

        return json({
            status: true,
            data: user
        })
    }

    return json({
        status: false
    })
}) satisfies RequestHandler
