<script lang="ts">
    import type { StatsResponse } from '$types/response'
    import type { Stat } from '$types/types'
    import { onMount } from 'svelte'

    let data: Stat[]

    onMount(async () => {
        let data = await fetch('/api/images/stats')
        let json = (await data.json()) as StatsResponse
        if (json.status) {
        }
    })
</script>

{#if !data}
    <div class="w-full h-full">
        <img src="/static/loading.gif" alt="Loading" />
    </div>
{:else}
    <div class="grid grid-cols-5" />
{/if}
