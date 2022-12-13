import express from 'express'
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

//administration
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'))
})

//image
app.get('/image/:id', (req, res) => {
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
        if (!fs.existsSync(filePath)) {
            res.status(404).send('Image not found.')
            r.stop(
                'Ended request from ' +
                    req.ip +
                    ' for preview of image ' +
                    req.params.id +
                    ' with status 404 (Image not found.)'
            )
            return
        }
        try {
            let image = sharp(filePath)
            let width = await image.metadata().then((metadata) => {
                return metadata.width
            })

            image.resize(Math.min(previewSize, width ? width : 0))
            await image.toFile(cachedFile)
        } catch (e) {
            res.status(500).send('Error while processing image.')
            r.stop(
                'Ended request from ' +
                    req.ip +
                    ' for preview of image ' +
                    req.params.id +
                    ' with status 500 (Error while processing image.)'
            )

            return
        }
    }

    res.sendFile(cachedFile)
    r.stop('Ended request from ' + req.ip + ' for preview of image ' + req.params.id + ' with status 200 (OK)')
})

//videos
app.get('/video/:id', (req, res) => {
    let name = req.params.id

    if (!name) {
        res.status(400).send('No video name provided.')
        return
    }

    let validExtensions = ['mp4', 'webm']

    let extension = name.split('.').pop()

    if (extension) {
        if (!validExtensions.includes(extension)) {
            res.status(400).send('Invalid extension.')
            return
        }
    }

    let filePath = path.join(storagePath, name)

    if (!fs.existsSync(filePath)) {
        res.status(404).send('Video not found.')
        return
    }

    res.sendFile(filePath)
})

app.listen(port, () => {
    l.stop(`Done.`)
    l.log('Listning on port ' + port)
})
