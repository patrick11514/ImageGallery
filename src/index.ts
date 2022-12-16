import express, { Request, Response } from 'express'
import sharp from 'sharp'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import JSONdb from 'simple-json-db'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

import Logger from './lib/logger'
import Cookies from './lib/cookies'
import { user } from './types/dbValues'

const l = new Logger('APP', 'blue')
l.start('Starting...')

dotenv.config({
    path: '.env',
})

const publicPath = path.join(__dirname, '..', 'public')
const storagePath = path.join(__dirname, '..', 'storage')
const cachePath = path.join(__dirname, '..', 'cache')
const app = express()
const port = 3000
const previewSize = 100
const r = new Logger('REQUEST', 'yellow')
const jsonParser = bodyParser.json()
const db = new JSONdb(path.join(__dirname, '..', 'db.json'), {
    syncOnWrite: true,
    asyncWrite: true,
    jsonSpaces: false,
})

const cookies = new Cookies()

function UUIDV4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
    })
}

async function generateCacheFile(res: Response, req: Request, filePath: string, cachedFile: string): Promise<boolean> {
    if (!fs.existsSync(filePath)) {
        res.status(404).send('Image not found.')
        r.stop(
            'Ended request from ' +
                req.ip +
                ' for preview of image ' +
                req.params.id +
                ' with status 404 (Image not found.)'
        )
        return false
    }
    try {
        let image = sharp(filePath)
        let width = await image.metadata().then((metadata) => {
            return metadata.width
        })

        image.resize(Math.min(previewSize, width ? width : 0))
        await image.toFile(cachedFile)
        return true
    } catch (e) {
        res.status(500).send('Error while processing image.')
        r.stop(
            'Ended request from ' +
                req.ip +
                ' for preview of image ' +
                req.params.id +
                ' with status 500 (Error while processing image.)'
        )

        return false
    }
}

app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(jsonParser)

//administration
app.use(express.static(publicPath))

//image
app.get('/image/:id', async (req, res) => {
    r.start('Got request from ' + req.ip + ' for image ' + req.params.id)

    let name = req.params.id

    if (!name) {
        res.status(400).send('No image name provided.')
        r.stop(
            'Ended request from ' +
                req.ip +
                ' for image ' +
                req.params.id +
                ' with status 400 (No image name provided.)'
        )
        return
    }

    let validExtensions = ['png', 'jpg', 'gif', 'webp']

    let extension = name.split('.').pop()

    if (extension) {
        if (!validExtensions.includes(extension)) {
            res.status(400).send('Invalid extension.')
            r.stop(
                'Ended request from ' + req.ip + ' for image ' + req.params.id + ' with status 400 (Invalid extension.)'
            )

            return
        }
    }

    let filePath = path.join(storagePath, name)

    if (!fs.existsSync(filePath)) {
        res.status(404).send('Image not found.')
        r.stop('Ended request from ' + req.ip + ' for image ' + req.params.id + ' with status 404 (Image not found.)')
        return
    }

    res.sendFile(filePath)
    r.stop('Ended request from ' + req.ip + ' for image ' + req.params.id + ' with status 200 (OK)')
})

//preview
app.get('/preview/:id', async (req, res) => {
    r.start('Got request from ' + req.ip + ' for preview of image ' + req.params.id)
    let name = req.params.id

    if (!name) {
        res.status(400).send('No image name provided.')
        r.stop(
            'Ended request from ' +
                req.ip +
                ' for preview of image ' +
                req.params.id +
                ' with status 400 (No image name provided.)'
        )

        return
    }

    let validExtensions = ['png', 'jpg', 'gif', 'webp']

    let extension = name.split('.').pop()

    if (extension) {
        if (!validExtensions.includes(extension)) {
            res.status(400).send('Invalid extension.')
            r.stop(
                'Ended request from ' +
                    req.ip +
                    ' for preview of image ' +
                    req.params.id +
                    ' with status 400 (Invalid extension.)'
            )

            return
        }
    }

    let cachedFile = path.join(cachePath, name)
    let filePath = path.join(storagePath, name)

    if (!fs.existsSync(cachedFile)) {
        let status = await generateCacheFile(res, req, filePath, cachedFile)

        if (!status) {
            return
        }
    } else {
        //get last modified date of cached file
        let cachedFileDate = fs.statSync(cachedFile).mtimeMs
        //check if normal file is newer than cached file if yes, recreate cache
        let normalFileDate = fs.statSync(filePath).mtimeMs

        if (normalFileDate > cachedFileDate) {
            r.log('Cached file is outdated, recreating...')

            let status = await generateCacheFile(res, req, filePath, cachedFile)

            if (!status) {
                return
            }
        }
    }

    res.sendFile(cachedFile)
    r.stop('Ended request from ' + req.ip + ' for preview of image ' + req.params.id + ' with status 200 (OK)')
})

//videos
app.get('/video/:id', (req, res) => {
    r.start('Got request from ' + req.ip + ' for video ' + req.params.id)
    let name = req.params.id

    if (!name) {
        res.status(400).send('No video name provided.')
        r.stop(
            'Ended request from ' +
                req.ip +
                ' for video ' +
                req.params.id +
                ' with status 400 (No video name provided.)'
        )

        return
    }

    let validExtensions = ['mp4', 'webm']

    let extension = name.split('.').pop()

    if (extension) {
        if (!validExtensions.includes(extension)) {
            res.status(400).send('Invalid extension.')
            r.stop(
                'Ended request from ' + req.ip + ' for video ' + req.params.id + ' with status 400 (Invalid extension.)'
            )
            return
        }
    }

    let filePath = path.join(storagePath, name)

    if (!fs.existsSync(filePath)) {
        res.status(404).send('Video not found.')
        r.stop('Ended request from ' + req.ip + ' for video ' + req.params.id + ' with status 404 (Video not found.)')
        return
    }

    res.sendFile(filePath)
    r.stop('Ended request from ' + req.ip + ' for video ' + req.params.id + ' with status 200 (OK)')
})

//files
app.get('/file/:id', (req, res) => {
    r.start('Got request from ' + req.ip + ' for file ' + req.params.id)
    let name = req.params.id

    if (!name) {
        res.status(400).send('No file name provided.')
        r.stop(
            'Ended request from ' + req.ip + ' for file ' + req.params.id + ' with status 400 (No file name provided.)'
        )
        return
    }

    let filePath = path.join(storagePath, name)

    if (!fs.existsSync(filePath)) {
        res.status(404).send('File not found.')
        r.stop('Ended request from ' + req.ip + ' for file ' + req.params.id + ' with status 404 (File not found.)')
        return
    }

    res.sendFile(filePath)
    r.stop('Ended request from ' + req.ip + ' for file ' + req.params.id + ' with status 200 (OK)')
})

//api
app.get('/api/logged', (req, res) => {
    r.start('Got request from ' + req.ip + ' for api logged')

    let sessId = req.cookies.sessId

    if (!sessId) {
        res.status(401).json({
            logged: false,
        })
        r.stop('Ended request from ' + req.ip + ' for api logged with status 401 (Not logged in.)')
        return
    }

    let data = cookies.get(sessId)
    if (!data) {
        res.status(401).json({
            logged: false,
        })
        r.stop('Ended request from ' + req.ip + ' for api logged with status 401 (Not logged in.)')
        return
    }

    //check if expired
    if (data.expires < Date.now()) {
        cookies.delete(sessId)
        res.status(401).json({
            logged: false,
        })
        r.stop('Ended request from ' + req.ip + ' for api logged with status 401 (Not logged in.)')
        return
    }

    res.status(200).json(data.value)
    r.stop('Ended request from ' + req.ip + ' for api logged with status 200 (OK)')
})

app.post('/api/login', async (req, res) => {
    r.start('Got request from ' + req.ip + ' for api login')

    let username = req.body.username
    let password = req.body.password

    if (!username || !password) {
        res.status(400).json({
            status: false,
            message: 'Missing username or password.',
        })

        r.stop('Ended request from ' + req.ip + ' for api login with status 400 (Invalid request.)')
        return
    }

    let users: user[] = db.get('users')

    let user = users.find((user) => user.username == username)

    if (!user) {
        res.status(401).json({
            status: false,
            message: 'Invalid user',
        })
        r.stop('Ended request from ' + req.ip + ' for api login with status 401 (Invalid username or password.)')
        return
    }

    if (!bcrypt.compareSync(password, user.password)) {
        res.status(401).json({
            status: false,
            message: 'Invalid password',
        })
        r.stop('Ended request from ' + req.ip + ' for api login with status 401 (Invalid username or password.)')
        return
    }

    let currentSessId = req.cookies.sessId

    if (currentSessId) {
        cookies.delete(currentSessId)
    }

    let sessId = UUIDV4()

    cookies.set(sessId, {
        expires: Date.now() + 2_592_000_000,
        value: {
            username: user.username,
            email: user.email,
            avatar: crypto.createHash('md5').update(user.email).digest('hex'),
        },
    })

    res.cookie('sessId', sessId, {
        maxAge: 2_592_000_000,
    })

    res.status(200).json({
        status: true,
    })
    r.stop('Ended request from ' + req.ip + ' for api login with status 200 (OK)')
})

app.get('/api/logout', (req, res) => {
    r.start('Got request from ' + req.ip + ' for api logout')

    let sessId = req.cookies.sessId

    if (!sessId) {
        res.status(401).json({
            status: false,
            message: 'Not logged in.',
        })
        r.stop('Ended request from ' + req.ip + ' for api logout with status 401 (Not logged in.)')
        return
    }

    cookies.delete(sessId)

    res.status(200).json({
        status: true,
    })
    r.stop('Ended request from ' + req.ip + ' for api logout with status 200 (OK)')
})

app.listen(port, () => {
    l.stop(`Done.`)
    l.log('Listning on port ' + port)
})
