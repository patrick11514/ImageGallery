<script lang="ts">
    import Login from './login.svelte'
    import { data } from '../components/data.svelte'
    import Redirect from '../components/redirect.svelte'
</script>

{#if $data?.logged}
    <Redirect link="/admin" />
{:else}
    <Login />
{/if}
