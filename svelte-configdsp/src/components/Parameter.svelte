<script lang="ts"> 
    import Parameter from './Parameter.svelte';
    import type { TreeNode } from '../types/TreeNode';

    export let node: TreeNode;
</script>


<tr>
<td> {node.name} </td>
<td>
{#if node.readonly}
    {node.value} 
{:else}

    {#if node.vartype === 'VAR_STRING'}
        <input type="text" bind:value={node.value} class="input input-bordered w-full max-w-xs" />
    {:else if node.vartype === 'VAR_INT'}
        <input type="number" bind:value={node.value} class="input input-bordered w-full max-w-xs" />
    {:else if node.vartype === 'VAR_FLOAT'}
        <input type="number" bind:value={node.value} class="input input-bordered w-full max-w-xs" step="0.001" />
    {:else}
        <span>Unsupported type</span>
    {/if}
{/if}

</td>
</tr>

<style lang="postcss">
    @reference "tailwindcss";
</style>