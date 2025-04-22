<script lang="ts">

    import ConfigDSP from '../components/ConfigDSP.svelte';
    import PresetTabs from '../components/PresetTabs.svelte';
    import PresetForm from '../components/PresetForm.svelte';
    import ExportOverlay from '../components/ExportOverlay.svelte';
    import IpSelector from '../components/IPSelector.svelte';
    import { gMainData } from '../stores/globalStore';

    let isExportOverlayVisible = false;

    const handleTabSelect = (index: number) => {
        console.log('Selected tab:', index);
        gMainData.update((data) => {
            data.current_preset_num = index;
            return data;
        });
        // if index is -1, show export overlay
    };

    const handleSave = (presetName: string) => {
        console.log('Saving preset:', presetName);
        // modify name in store of current preset
        // show export overlay
        gMainData.update((data) => {
            data.presets[data.current_preset_num] = presetName;
            return data;
        });
    };

    const handleAbort = () => {
        console.log('Aborting changes');
    };

    const handleExportClose = () => {
        isExportOverlayVisible = false;
    };
</script>

<main>
    <h1 class="text-xl font-bold">Config DSP</h1>
    <IpSelector />
    <PresetTabs onTabSelect={handleTabSelect} />
    <PresetForm onSave={handleSave} onAbort={handleAbort} />
    <ExportOverlay isVisible={isExportOverlayVisible} onClose={handleExportClose} />
    <ConfigDSP />
</main>

<style lang="postcss">
    @reference "tailwindcss";
</style>