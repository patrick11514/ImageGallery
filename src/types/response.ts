import type { Stat, User } from './types'

export interface Response {
    status: boolean
    message?: string
    error?: string
}

export interface LoginResponse extends Response {
    data: User
}

export interface StatsResponse extends Response {
    data: Stat[]
}
