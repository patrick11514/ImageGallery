<script lang="ts" context="module">
    import { writable } from 'svelte/store'

    export const data = writable<{
        logged: boolean
        username: string
    }>()
</script>
