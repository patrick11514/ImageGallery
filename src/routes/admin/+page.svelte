<script lang="ts">
    import Badge from '../../components/badge.svelte'
    import { data } from '../../components/data.svelte'
    import Redirect from '../../components/redirect.svelte'
</script>

{#if !$data?.logged}
    <Redirect link="/" />
{:else}
    <div class="w-full h-full flex flex-col md:flex-row">
        <div class="md:w-3/12 w-full bg-slate-800">
            <h1 class="mx-auto w-max font-bold font-sono text-4xl pt-3 border-b-white border-b-4">
                Galerie
            </h1>
            <h2 class="mx-auto w-max font-bold flex flex-col">
                <img
                    class="rounded-full m-auto"
                    src={`https://gravatar.com/avatar/${$data.hash}`}
                    alt="pfp"
                />
                <div class="flex flex-col">
                    <h2>{$data.username}</h2>
                    <Badge bg={$data.role?.color}>{$data.role?.name}</Badge>
                </div>
            </h2>
        </div>
        <div>{JSON.stringify($data, null, 4)}</div>
    </div>
{/if}
