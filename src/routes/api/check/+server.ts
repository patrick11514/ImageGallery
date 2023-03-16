import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { deleteCookie, getCookie } from '$lib/server/cookies/main'
import type { User } from '../../../../../../Projects/Images/src/types/types'

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
