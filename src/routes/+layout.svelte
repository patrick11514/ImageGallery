<script lang="ts">
    import '../app.css'
    import { data as mainData } from '../components/data.svelte'
    import type { LayoutData } from './$types'

    export let data: LayoutData
    mainData.set(data)
</script>

<slot />
