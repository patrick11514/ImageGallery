<script lang="ts" context="module">
    import { writable } from 'svelte/store'

    export const data = writable<{
        logged: boolean
        username?: string
        hash?: string
        admin?: boolean
        role: {
            name: string
            color: string
        }
        permissions?: string[]
    }>({
        logged: false,
        role: {
            name: '',
            color: ''
        }
    })

    export const currentPage = writable<{
        name: string
        id: string
    }>({
        name: '',
        id: ''
    })
</script>
