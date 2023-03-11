import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { deleteCookie } from '$lib/server/cookies/main'

export const POST = (async ({ cookies }) => {
    const cookie = cookies.get('session')
    if (cookie) {
        deleteCookie(cookie)
        cookies.delete('session', {
            path: '/'
        })

        return json({
            status: true
        })
    }

    return json({
        status: false
    })
}) satisfies RequestHandler
