// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        // interface Locals {}
        // interface PageData {}
        // interface Platform {}
    }
}

export {}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DEFAULT_USERNAME: string
            DEFAULT_PASSWORD: string
            DB_HOST: string
            DB_PORT: string
            DB_USERNAME: string
            DB_PASSWORD: string
            DB_DATABASE: string
            JWT_KEY: string
        }
    }
}

export {}
