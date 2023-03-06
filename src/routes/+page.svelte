<script lang="ts">
    import { data } from '$lib/data.svelte'
    import Login from './login.svelte'
    import Admin from './admin.svelte'
</script>

Username: {$data?.username}

{#if $data?.logged}
    <Admin />
{:else}
    <Login />
{/if}
