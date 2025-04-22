<script lang="ts">
    import { gMainData } from '../stores/globalStore';
    // Removed unnecessary import of 'get' from 'svelte/store'

    export let onTabSelect;

    const handleTabClick = (index: number) => {
        if (onTabSelect) {
            onTabSelect(index);
        }
    };
</script>

<div class="tabs tabs-box">
    
    {#each $gMainData.presets as preset, index}
        <input type="radio"
            class="tab"
            checked="{index === $gMainData.current_preset_num}"
            on:click={() => handleTabClick(index)}
            aria-label={preset}/>
    {/each}
    {#if $gMainData.presets.length < 20}
        <input class="tab add-tab" on:click={() => handleTabClick(-1)} aria-label={"+ Add Preset"} />
    {/if}
</div>

<style lang="postcss">
    @reference "tailwindcss";
</style>