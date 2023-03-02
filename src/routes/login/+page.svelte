<script lang="ts">
    import Button from '../../components/button.svelte'
    import Input from '../../components/input.svelte'
    import { test } from '../../hooks/login.svelte'

    async function login() {
        console.log(await test())
    }
</script>

<div class="m-auto p-4 w-18/24 h-22/24 bg-slate-700 rounded-xl">
    <h1 class="mx-auto w-max font-bold text-4xl">Přihlášení</h1>
    <div class="m-auto flex flex-col w-3/4">
        <Input name="Uživatelské jméno" />
        <Input name="Heslo" type="password" />
        <Button class="w-1/4 mx-auto mt-2" type="button" on:click={() => login()}>
            Přihlásit se
        </Button>
    </div>
</div>
