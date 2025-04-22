
<script lang="ts">
    import { onMount } from 'svelte';
    import { gMainData } from '../stores/globalStore';
    import { get } from 'svelte/store';

    let ipAddress = '';
    let isValidIP = false;

    const validateIP = () => {
            const ipRegex = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/
            // test the regex against the input value
            isValidIP = ipRegex.test(ipAddress);

            return isValidIP;
    }
</script>

<div class="flex flex-col items-center">
    <label for="ipAddress" class="text-lg font-bold">Enter IP Address:</label>
    <input
        id="ipAddress"
        type="text"
        bind:value={ipAddress}
        placeholder="192.168.128.1"
        class="border border-gray-300 rounded p-2 mt-2"
        on:input={validateIP}
    />
    <button
        class="btn btn-primary mt-4"
        on:click={() => {
            if (isValidIP) {
                gMainData.update((data) => {
                    data.ip_address = ipAddress;
                    data.valid_ip = isValidIP;
                    return data;
                });
            } else {
                alert('Invalid IP address');
            }
        }}
        >
        Connect
    </button>
    {#if isValidIP}
        <p class="text-green-500 mt-2">Valid IP address</p>
    {:else}
        <p class="text-red-500 mt-2">Invalid IP address</p>
    {/if}
</div>
<style lang="postcss">
    @reference "tailwindcss";
</style>
<!-- <script> -->
