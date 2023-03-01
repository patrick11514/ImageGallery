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

declare module '*.svelte' {
    export { SvelteComponentDev as default } from 'svelte/internal'
}

export {}
