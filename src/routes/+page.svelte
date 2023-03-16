<script lang="ts">
    import Login from '../components/login.svelte'
    import { data } from '../components/data.svelte'
    import Redirect from '../components/redirect.svelte'
</script>

<svelte:head>
    <title>Login | Patrik Mintěl</title>
</svelte:head>

{#if $data?.logged}
    <Redirect link="/admin/home" />
{:else}
    <Login />
{/if}
