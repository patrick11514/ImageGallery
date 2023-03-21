<script lang="ts">
    import type { StatsResponse } from '$types/response'
    import type { Stat } from '$types/types'
    import { onMount } from 'svelte'
    import Loading from '../loading.svelte'

    let data: Stat[]

    onMount(async () => {
        let request = await fetch('/api/images/stats')
        let json = (await request.json()) as StatsResponse
        if (json.status) {
            data = json.data
        }
    })
</script>

{#if !data}
    <Loading />
{:else}
    <div class="grid grid-cols-5">
        {#each data as status}
            <div style={`background-color: ${status.color};`}>{status.name}</div>
        {/each}
    </div>
{/if}
