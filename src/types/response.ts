export interface Response {
    status: boolean
    message?: string
    error?: string
}

export interface LoginResponse extends Response {
    data: {
        role: {
            name: string
            color: string
        }
        admin: boolean
    }
}
