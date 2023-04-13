import { jwt } from '$lib/server/vars'
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

    const data = jwt.getCookie<User>(uuid)

    if (!data) {
        return {
            logged: false,
            role: {
                name: '',
                color: ''
            }
        }
    }

    return {
        ...data,
        logged: true
    }
}) satisfies LayoutServerLoad
