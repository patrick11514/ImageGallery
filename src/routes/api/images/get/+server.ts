import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { getCookie } from '$lib/server/cookies/main'
import type { User } from '$types/types'
import * as fs from 'fs'

export const GET = (async ({ cookies }) => {
    const cookie = cookies.get('session')
    if (cookie) {
        const user = getCookie<User | undefined>(cookie)
        if (!user) {
            return json({
                status: false
            })
        }
    }

    const files = fs.readdirSync('static/storage')
    console.log(files)

    return json({})
}) satisfies RequestHandler
