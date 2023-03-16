<script lang="ts">
    export let bg: string
    export let text = 'fff'
</script>

<div style={`background-color: #${bg}; color: #${text};`} class="mx-auto px-4 py-0.5 rounded-xl">
    <slot />
</div>
