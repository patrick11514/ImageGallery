<script lang="ts">
    export let error = ''
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
</script>

<div id="input" class="flex flex-col">
    <label class="font-bold flex flex-col" for={`input-${id}`}>
        <span class="text-xl border-b-white border-b-2 w-max">{name}</span>
        {#if error}
            <span class="text-lg text-red-600">{error}</span>
        {/if}
    </label>
    <input
        class="p-2 outline-none bg-transparent hover:bg-black hover:bg-opacity-25 focus:bg-black focus:bg-opacity-25 duration-300 border-b-black border-b-2"
        id={`input-${id}`}
        {type}
    />
</div>
