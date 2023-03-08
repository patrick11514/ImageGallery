import bcrypt from 'bcrypt'

export function hashPass(password: string) {
    return bcrypt.hashSync(password, 10)
}

export function comparePass(password: string, hash: string) {
    return bcrypt.compareSync(password, hash)
}
