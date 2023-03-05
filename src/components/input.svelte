<script lang="ts">
    export let error: boolean
    export let type = 'text'
    export let name: string

    function makeid(length: number): string {
        let result = ''
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        const charactersLength = characters.length
        let counter = 0
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength))
            counter += 1
        }
        return result
    }

    let id = makeid(5)

    export let value: string
</script>

<div id="input" class="flex flex-col">
    <label class="font-bold flex flex-col" for={`input-${id}`}>
        <span class="text-xl border-b-white border-b-2 w-max">{name}</span>
    </label>
    {#if type == 'text'}
        <input
            class={`p-2 outline-none bg-transparent hover:bg-black hover:bg-opacity-25 focus:bg-black focus:bg-opacity-25 duration-300 border-b-2 ` +
                (error ? 'border-b-red-500 text-red-500' : 'border-b-black')}
            id={`input-${id}`}
            type="text"
            bind:value
        />
    {:else if type == 'password'}
        <input
            class={`p-2 outline-none bg-transparent hover:bg-black hover:bg-opacity-25 focus:bg-black focus:bg-opacity-25 duration-300 border-b-2 ` +
                (error ? 'border-b-red-500 text-red-500' : 'border-b-black')}
            id={`input-${id}`}
            type="password"
            bind:value
        />
    {/if}
</div>
