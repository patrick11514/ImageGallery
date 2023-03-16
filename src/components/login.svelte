<script lang="ts">
    import Button from './button.svelte'
    import Input from './input.svelte'

    import type { LoginResponse } from '../types/response'

    import { data } from './data.svelte'

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

        let response = (await request.json()) as LoginResponse

        if (response.status) {
            data.set({
                ...response.data,
                logged: true
            })
        } else {
            error = response?.error
            inputError.username = true
            inputError.password = true
        }
        target.disabled = false
    }
</script>

<div
    class="m-auto p-4 md:w-14/24 lg:w-12/24 xl:w-10/24 2xl:w-8/24 w-full h-96 bg-zinc-600 rounded-xl duration-300 flex flex-col"
>
    <h1 class="mx-auto mt-auto w-max font-bold text-4xl">Přihlášení</h1>
    <form class="m-auto mb-auto flex flex-col w-3/4">
        {#if error}
            <h1 class="text-red-500 text-center font-bold text-xl">{error}</h1>
        {/if}
        <Input bind:value={username} error={inputError.username} name="Uživatelské jméno" />
        <Input bind:value={password} error={inputError.password} name="Heslo" type="password" />
        <Button class="w-2/4 mx-auto mt-2" type="submit" on:click={(ev) => login(ev)}>
            Přihlásit se
        </Button>
    </form>
</div>
