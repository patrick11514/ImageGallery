<script lang="ts">
    import { data } from '$lib/data.svelte'
    import Login from './login.svelte'
</script>

Username: {$data?.username}

{#if $data?.logged}
    Jsi lognuty LOL XD
{:else}
    <Login />
{/if}
