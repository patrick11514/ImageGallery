import { connection as conn } from './vars'
import fs from 'fs'
import { hashPass } from './funcs'
import path from 'path'
import { DEFAULT_USERNAME, DEFAULT_PASSWORD } from '$env/static/private'

export async function createTables() {
    const files = fs.readdirSync('./src/lib/server').filter((f) => f.endsWith('.sql'))

    for (const file of files) {
        const content = fs.readFileSync(path.join('./src/lib/server', file), 'utf8')
        const commands = content.split('\n').map((command) => {
            return command.trim()
        })

        for (const command of commands) {
            await conn.query(command)
        }
    }

    //create default user
    conn.query(
        'INSERT INTO `users` (`id`, `username`, `password`, `email`, `group_name`) VALUES (NULL, ?, ?, ?, "admin")',
        [DEFAULT_USERNAME, hashPass(DEFAULT_PASSWORD), 'example@example.com']
    )
}
