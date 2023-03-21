import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { getCookie } from '$lib/server/cookies/main'
import type { User } from '$types/types'

export const GET = (async ({ cookies }) => {
    const cookie = cookies.get('session')
    if (cookie) {
        const user = getCookie<User | undefined>(cookie)
        if (!user) {
            return json({
                status: false
            })
        }

        return json({
            status: true,
            data: user.values
        })
    }

    return json({
        status: false
    })
}) satisfies RequestHandler
