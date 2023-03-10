import { json } from '@sveltejs/kit'
import type { UserLogin } from '../../../types/request'
import type { RequestHandler } from './$types'
import type { LoginResponse, Response } from '../../../types/response'
import { connection as conn } from '$lib/server/mysql'
import { comparePass } from '$lib/server/funcs'
import { setCookie } from '$lib/server/cookies/main'
import type { User } from '../../../types/types'
import crypto from 'crypto'

export const POST = (async ({ request, cookies }) => {
    return json({
        status: false
    })
}) satisfies RequestHandler
