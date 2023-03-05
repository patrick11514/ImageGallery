import { json } from '@sveltejs/kit'
import type { UserLogin } from '../../../types/request'
import type { RequestHandler } from './$types'
import { DEFAULT_USERNAME, DEFAULT_PASSWORD } from '$env/static/private'

export const POST = (async ({ request }) => {
    const data = (await request.json()) as UserLogin

    if (data.username == DEFAULT_USERNAME && data.password == DEFAULT_PASSWORD) {
        return json({
            status: true
        })
    }

    return json({
        status: false,
        error: 'Invalid username or password'
    })
}) satisfies RequestHandler
