<script lang="ts">
    let props = $props();
</script>

<div class="card">
    <div class="block card-body rounded-xl shadow-lg">
        <h2 class="block-title badge badge-primary">{props.title}</h2>
        <p class="block-content">{props.text}</p>
    </div>
</div>

<style lang="postcss">
    @reference "tailwindcss";
</style>