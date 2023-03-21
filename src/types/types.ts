export interface User {
    role: {
        name: string
        color: string
    }
    admin: boolean
    hash: string
    username: string
}

export interface Stat {
    color: string
    name: string
    count: number
}
