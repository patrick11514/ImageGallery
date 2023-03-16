<script lang="ts">
    import { data } from './data.svelte'
</script>

<div>
    {JSON.stringify($data, null, 4)}
</div>
