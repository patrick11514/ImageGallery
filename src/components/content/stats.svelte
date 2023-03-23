<script lang="ts">
    import type { StatsResponse } from '$types/response'
    import type { Stat } from '$types/types'
    import { onMount } from 'svelte'
    import Fa from 'svelte-fa'
    import Loading from '../loading.svelte'

    import Chart from 'chart.js/auto'

    let data: Stat[]

    let chartValues = [20, 10, 5, 2, 20, 30, 45]
    let chartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
    let ctx
    let chartCanvas: HTMLCanvasElement

    onMount(async () => {
        let request = await fetch('/api/images/stats')
        let json = (await request.json()) as StatsResponse
        if (json.status) {
            data = json.data
        }

        ctx = chartCanvas.getContext('2d')
        //@ts-ignore
        var chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: chartLabels,
                datasets: [
                    {
                        label: 'Revenue',
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: chartValues
                    }
                ]
            }
        })
    })
</script>

{#if !data}
    <Loading />
{:else}
    <div class="m-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 5xl:grid-cols-5">
        {#each data as status}
            <div class={'mx-1 rounded-xl p-2 flex flex-row' + ' ' + status.color}>
                <div class="w-12 h-12">
                    <Fa icon={status.icon} class="h-full w-full text-4xl my-1.5" />
                </div>
                <div class="flex flex-col">
                    <h2 class="font-bold text-xl">{status.name}</h2>
                    <h2>{status.count}</h2>
                </div>
            </div>
        {/each}
    </div>
{/if}

<canvas bind:this={chartCanvas} id="myChart" />
