<script lang="ts" context="module">
    import { writable } from 'svelte/store'

    export const data = writable<{
        logged: boolean
        username: string
        hash: string
        role: {
            name: string
            color: string
        }
        permissions: string[]
    }>({
        logged: false,
        username: '',
        hash: '',
        role: {
            name: '',
            color: ''
        },
        permissions: []
    })
</script>
