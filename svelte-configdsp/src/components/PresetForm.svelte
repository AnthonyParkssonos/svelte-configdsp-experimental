<script>
    import { gMainData } from '../stores/globalStore';
    import { get } from 'svelte/store';

    export let onSave;
    export let onAbort;

    let presetName = get(gMainData).presets[get(gMainData).current_preset_num] || '';

    const handleSave = () => {
        if (onSave) {
            onSave(presetName);
        }
    };

    const handleAbort = () => {
        if (onAbort) {
            onAbort();
        }
    };
</script>

<div>
    <label for="presetName">Preset Name:</label>
    <input
        id="presetName"
        type="text"
        bind:value={presetName}
        placeholder="Enter preset name"
    />

    <button class="btn btn-primary" on:click={handleSave}>Save</button>
    <button class="btn btn-primary" on:click={handleAbort}>Abort</button>
</div>

<style lang="postcss">
    @reference "tailwindcss";

</style>