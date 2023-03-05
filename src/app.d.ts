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
        }
    }
}

export {}
