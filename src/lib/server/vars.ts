import db from 'mariadb'
import { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } from '$env/static/private'

export const connection = await db.createConnection({
    host: DB_HOST,
    port: parseInt(DB_PORT),
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE
})
