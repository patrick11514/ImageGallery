<script lang="ts">
    import { goto } from '$app/navigation'
    import Badge from '../../components/badge.svelte'
    import Button from '../../components/button.svelte'
    import { data } from '../../components/data.svelte'
    import Redirect from '../../components/redirect.svelte'
    import type { Response } from '../../types/response'

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
        <div class="flex flex-col">
            <div class="flex flex-row">
                <div>Nějaký text</div>
                <div><Button on:click={() => logout()} type="button">Odhlásit se</Button></div>
            </div>
            <div>{JSON.stringify($data, null, 4)}</div>
        </div>
    </div>
{/if}
