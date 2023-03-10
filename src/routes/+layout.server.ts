import { getCookie } from '$lib/server/cookies/main'
import type { User } from '../types/types'
import type { LayoutServerLoad } from './$types'

export const load = (({ cookies }) => {
    const uuid = cookies.get('session')
    if (!uuid) {
        return {
            logged: false,
            role: {
                name: '',
                color: ''
            }
        }
    }

    const data = getCookie<User>(uuid)

    return {
        ...data.values,
        logged: true
    }
}) satisfies LayoutServerLoad
