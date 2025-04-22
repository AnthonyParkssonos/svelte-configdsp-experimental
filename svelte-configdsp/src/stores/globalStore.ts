import { writable } from 'svelte/store';

export const gMainData = writable({
    presets: [
        'Preset 1',
        'Preset 2',
    ],
    current_preset_num: 0,
    ip_address: '',
    valid_ip: false,
});


export const gCurrentlyWorking = writable(false);
export const gCurrentlyWorkingMessage = writable('Still working... please wait a moment and try again.');