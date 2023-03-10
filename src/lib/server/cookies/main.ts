import JSONdb from 'simple-json-db'
import { v4 as uuid } from 'uuid'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

interface cookie<Type> {
    expires: number
    values: Type
}

const db = new JSONdb<cookie<unknown>>(path.join(__dirname, 'cookies.json'), {
    syncOnWrite: true,
    jsonSpaces: false,
    asyncWrite: false
})

const checkCookies = () => {
    const cookies = Object.entries(db.JSON())
    cookies.forEach(([key, value]) => {
        if (value.expires < Date.now()) {
            db.delete(key)
        }
    })
}

export const getCookie = <T>(key: string) => {
    checkCookies()
    return db.get(key) as cookie<T>
}

export const updateCookie = <T>(id: string, value: T, age: number) => {
    checkCookies()

    db.set(id, {
        expires: Date.now() + age,
        values: value
    })

    return id
}

export const setCookie = <T>(value: T, age: number) => {
    checkCookies()

    let id = uuid()

    while (db.has(id)) {
        id = uuid()
    }

    db.set(id, {
        expires: Date.now() + age,
        values: value
    })

    return id
}

export const deleteCookie = (key: string) => {
    checkCookies()
    db.delete(key)
}
