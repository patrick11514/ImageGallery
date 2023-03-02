export {}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BROWSER_PASSWORD: string
            COOKIE_SECRET: string
            DEFAULT_USER_NAME: string
            DEFAULT_USER_PASS: string
            DEFAULT_USER_EMAIL: string
            ADMIN_ROLE_NAME: string
            ADMIN_ROLE_COLOR: string
        }
    }
}
