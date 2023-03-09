import type { User } from './types'

export interface Response {
    status: boolean
    message?: string
    error?: string
}

export interface LoginResponse extends Response {
    cookie: string
    data: User
}
