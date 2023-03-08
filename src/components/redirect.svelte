<script lang="ts">
    import { goto } from '$app/navigation'
    import { redirect } from '@sveltejs/kit'
    import { onDestroy, onMount } from 'svelte'

    export let link: string

    let dots = ''

    let running = true

    let timeout: NodeJS.Timeout

    onMount(() => {
        func()
        goto('/admin')
    })

    let func = () => {
        if (dots.length == 3) {
            dots = ''
        } else {
            dots += '.'
        }
        if (running) {
            timeout = setTimeout(() => func(), 1000)
        }
    }

    onDestroy(() => {
        clearTimeout(timeout)
        running = false
    })
</script>

<div class="w-full h-full flex flex-col">
    <h1 class="mx-auto mt-auto text-4xl font-bold">Redirecting to{dots}</h1>
    <h2 class="mx-auto mb-auto text-3xl font-bold">{link}</h2>
</div>
