<script lang="ts">
    import type { StatsResponse } from '$types/response'
    import type { Stat } from '$types/types'
    import { onMount } from 'svelte'
    import Fa from 'svelte-fa'
    import { faPaperclip } from '@fortawesome/free-solid-svg-icons'
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
            <div class="rounded-xl p-2 flex flex-row" style={`background-color: ${status.color};`}>
                <Fa icon={faPaperclip} class="h-full w-auto" />
                <div class="flex flex-col">
                    <h2 class="font-bold text-xl">{status.name}</h2>
                    <h2>{status.count}</h2>
                </div>
            </div>
        {/each}
    </div>
{/if}
