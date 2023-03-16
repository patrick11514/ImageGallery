<script lang="ts">
    export let type: 'button' | 'submit' | 'reset' | null | undefined
    let cls = ''
    export { cls as class }
</script>

<button
    on:click
    {type}
    class={`md:px-4 py-2 rounded-xl bg-neutral-700 hover:bg-zinc-900 duration-300 font-bold disabled:active:bg-slate-800 active:bg-slate-900 disabled:cursor-not-allowed ${
        cls || ''
    }`}
>
    <slot />
</button>
