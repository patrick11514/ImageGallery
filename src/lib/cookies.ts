import JSONdb from 'simple-json-db'
import path from 'path'
import { cookie } from '../types/dbValues'

class Cookies {
    filePath = path.join(__dirname, '../..', 'cookies.json')
    db: JSONdb

    constructor() {
        this.db = new JSONdb(this.filePath, {
            syncOnWrite: true,
            asyncWrite: true,
            jsonSpaces: false,
        })
        this.checkOldCookies()
    }

    checkOldCookies(): void {
        let jsonData = this.db.JSON()
        for (let [cookie, data] of Object.entries(jsonData) as [string, cookie][]) {
            if (data.expires < Date.now()) {
                this.db.delete(cookie)
            }
        }
    }

    get(sessId: string): cookie | undefined {
        return this.db.get(sessId)
    }

    delete(sessId: string): void {
        this.db.delete(sessId)
    }

    set(sessId: string, value: cookie): void {
        this.db.set(sessId, value)
    }
}

export default Cookies
