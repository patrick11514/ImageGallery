interface cookie {
    expires: number
    value: object
}

interface user {
    username: string
    email: string
    password: string
    roles: string[]
}

interface role {
    name: string
    color: string
}

export { cookie, user, role }
