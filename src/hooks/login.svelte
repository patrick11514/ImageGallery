<script lang="ts" context="module">
    import { writable } from 'svelte/store'

    export const store = writable(null)

    export const test = async () => {
        return 'ahoj'
    }
</script>
