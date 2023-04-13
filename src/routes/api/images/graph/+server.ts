import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import type { User } from '$types/types'
import * as fs from 'fs'
import { faFile, faFileImage, faFileInvoice, faFileVideo } from '@fortawesome/free-solid-svg-icons'
import { jwt } from '$lib/server/vars'

export const GET = (async ({ cookies }) => {
    const cookie = cookies.get('session')
    if (cookie) {
        const user = jwt.getCookie<User | undefined>(cookie)
        if (!user) {
            return json({
                status: false
            })
        }
    }

    const colors = {
        images: 'bg-pink-400',
        videos: 'bg-blue-500',
        gifs: 'bg-green-500',
        other: 'bg-yellow-500'
    }

    const icons = {
        images: faFileImage,
        videos: faFileVideo,
        gifs: faFileInvoice,
        other: faFile
    }

    if (!fs.existsSync('static/storage')) {
        fs.mkdirSync('static/storage')
    }

    const files = fs.readdirSync('static/storage')
    const data = {
        images: 0,
        videos: 0,
        gifs: 0,
        other: 0
    }

    const extensions = {
        images: ['png', 'jpg', 'jpeg', 'webp', 'bmp', 'gif'],
        videos: ['mp4', 'webm', 'mov', 'avi', 'flv', 'wmv', 'mkv'],
        gifs: ['gif']
    }

    for (const file of files) {
        const extension = file.split('.').pop()

        if (!extension) {
            data.other++
            continue
        }

        if (extensions.images.includes(extension)) {
            data.images++
        } else if (extensions.videos.includes(extension)) {
            data.videos++
        } else if (extensions.gifs.includes(extension)) {
            data.gifs++
        } else {
            data.other++
        }
    }

    return json({
        status: true,
        data: Object.entries(data).map(([name, count]) => {
            return {
                color: colors[name as keyof typeof colors],
                icon: icons[name as keyof typeof icons],
                name,
                count
            }
        })
    })
}) satisfies RequestHandler
