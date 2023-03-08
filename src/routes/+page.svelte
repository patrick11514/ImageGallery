<script lang="ts">
    import { data } from '$lib/data.svelte'
    import Login from './login.svelte'
    import Redirect from '../components/redirect.svelte'
</script>

{#if $data?.logged}
    <Redirect link="/admin" />
{:else}
    <Login />
{/if}
