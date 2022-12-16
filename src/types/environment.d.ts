export {}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BROWSER_PASSWORD: string
            COOKIE_SECRET: string
        }
    }
}
