<script lang="ts">
    export let bg: string
    export let text = '#fff'
</script>

<div style={`background-color: ${bg}; color: ${text};`} class="px-2 py-1 rounded-xl"><slot /></div>
