<script lang="ts">
    import { goto } from '$app/navigation'
    import Badge from './badge.svelte'
    import Button from './button.svelte'
    import Content from './content.svelte'
    import { data, currentPage } from './data.svelte'
    import Navigation from './navigation.svelte'
    import Redirect from './redirect.svelte'
    import type { Response } from '../types/response'

    const logout = async () => {
        let request = await fetch('/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        let json = (await request.json()) as Response

        if (json.status) {
            data.set({
                logged: false,
                role: {
                    name: '',
                    color: ''
                }
            })
            goto('/')
        }
    }
</script>

<svelte:head>
    <title>Admin | Patrik Mintěl</title>
</svelte:head>

{#if !$data?.logged}
    <Redirect link="/" />
{:else}
    <div class="w-full h-full flex flex-col md:flex-row">
        <div
            class="md:w-6/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12 w-full bg-zinc-800 border-r-2 border-r-black"
        >
            <h1 class="mx-auto w-max font-bold font-sono text-4xl pt-3 border-b-white border-b-4">
                Galerie
            </h1>
            <h2
                class="mx-auto w-5/6 my-2 bg-slate-700 rounded-xl border-2 border-black font-bold flex flex-row"
            >
                <img
                    class="p-4 rounded-full"
                    src={`https://gravatar.com/avatar/${$data.hash}?s=128`}
                    alt="pfp"
                />
                <div class="my-auto mx-auto flex flex-col">
                    <h2>{$data.username}</h2>
                    <Badge bg={$data.role?.color}>{$data.role?.name}</Badge>
                </div>
            </h2>
            <Navigation />
        </div>
        <div class="w-full flex flex-col">
            <div class="flex flex-row border-b-2 bg-neutral-800 border-b-black">
                <div class="font-bold text-2xl my-auto ml-4 mr-auto">{$currentPage.name}</div>
                <div class="m-3">
                    <Button on:click={() => logout()} type="button">Odhlásit se</Button>
                </div>
            </div>
            <Content />
        </div>
    </div>
{/if}
