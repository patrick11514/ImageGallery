import type { IconDefinition as Solid } from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition as Brands } from '@fortawesome/free-brands-svg-icons'

export interface User {
    role: {
        name: string
        color: string
    }
    admin: boolean
    hash: string
    username: string
}

export interface Stat {
    color: string
    name: string
    count: number
    icon: Solid | Brands
}
