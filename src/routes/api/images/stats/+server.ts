import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { getCookie } from '$lib/server/cookies/main'
import type { User } from '$types/types'
import * as fs from 'fs'

export const GET = (async ({ cookies }) => {
    const cookie = cookies.get('session')
    if (cookie) {
        const user = getCookie<User | undefined>(cookie)
        if (!user) {
            return json({
                status: false
            })
        }
    }

    const colors = {
        images: '#ff0000',
        videos: '#00ff00',
        gifs: '#0000ff',
        other: '#000000'
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
                name,
                count
            }
        })
    })
}) satisfies RequestHandler
