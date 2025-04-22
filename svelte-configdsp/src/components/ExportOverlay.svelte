<script>
    export let isVisible = false;
    export let onClose;

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };
</script>

{#if isVisible}
    <div id="export_overlay">
        <div class="overlay-content">
            <p>Exporting...</p>
            <button class="btn" on:click={handleClose}>Close</button>
        </div>
    </div>
{/if}

<style>
</style>