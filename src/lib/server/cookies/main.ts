import JSONdb from 'simple-json-db'
import { v4 as uuid } from 'uuid'

interface cookie {
    expires: number
    values: unknown
}

const db = new JSONdb<cookie>('cookies.json', {
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

export const getCookie = (key: string) => {
    checkCookies()
    return db.get(key)
}

export const setCookie = <T>(value: T, age: number) => {
    checkCookies()

    const id = uuid()
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
