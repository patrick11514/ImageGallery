<script lang="ts">
    import { currentPage } from './data.svelte'
    import Stats from './content/stats.svelte'

    const content = {
        home: Stats
    }
    let page: (typeof content)[keyof typeof content]

    currentPage.subscribe(() => {
        page = content[$currentPage.id as keyof typeof content]
    })
</script>

<svelte:component this={page} />
