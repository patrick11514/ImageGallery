import express, { Request, Response } from 'express'
import sharp from 'sharp'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

import Logger from './lib/logger'

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

app.listen(port, () => {
    l.stop(`Done.`)
    l.log('Listning on port ' + port)
})
