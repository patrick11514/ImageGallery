<script lang="ts">
    import Button from '../components/button.svelte'
    import Input from '../components/input.svelte'

    import type { Response } from '../types/response'

    import { data } from '$lib/data.svelte'

    let username: string
    let password: string

    let error: string | undefined = undefined

    let inputError = {
        username: false,
        password: false
    }

    async function login(ev: MouseEvent) {
        let target = ev.target as HTMLButtonElement

        let err = false

        if (!username) {
            inputError.username = true
            err = true
        }

        if (!password) {
            inputError.password = true
            err = true
        }

        if (err) {
            return
        }

        inputError.username = false
        inputError.password = false

        target.disabled = true

        let request = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })

        let response = (await request.json()) as Response

        if (response.status) {
            $data.username = username
            $data.logged = true
        } else {
            error = response?.error
            inputError.username = true
            inputError.password = true
        }
        target.disabled = false
    }
</script>

<div class="m-auto p-4 w-18/24 h-22/24 bg-slate-700 rounded-xl">
    <h1 class="mx-auto w-max font-bold text-4xl">Přihlášení</h1>
    <div class="m-auto flex flex-col w-3/4">
        {#if error}
            <h1 class="text-red-500 text-center font-bold text-xl">{error}</h1>
        {/if}
        <Input bind:value={username} error={inputError.username} name="Uživatelské jméno" />
        <Input bind:value={password} error={inputError.password} name="Heslo" type="password" />
        <Button class="w-1/4 mx-auto mt-2" type="button" on:click={(ev) => login(ev)}>
            Přihlásit se
        </Button>
    </div>
</div>
