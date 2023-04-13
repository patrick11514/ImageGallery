import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { jwt } from '$lib/server/vars'

export const POST = (async ({ cookies }) => {
    const cookie = cookies.get('session')
    if (cookie) {
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
