<script lang="ts">
    export let type: 'button' | 'submit' | 'reset' | null | undefined
    let cls: string
    export { cls as class }
</script>

<button
    on:click
    {type}
    class={`px-4 py-2 border-black border-2 rounded-xl bg-slate-800 hover:bg-slate-9 duration-300 font-bold ${
        cls || ''
    }`}><slot /></button
>
