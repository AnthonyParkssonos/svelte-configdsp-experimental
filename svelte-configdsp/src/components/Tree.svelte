<script lang="ts">
    import { slide } from 'svelte/transition';
    import Tree from './Tree.svelte';
    import Parameter from './Parameter.svelte';
    import type { TreeNode } from '../types/TreeNode';

    export let node: TreeNode;

    let expanded = false;

    function toggle() {
        expanded = !expanded;
    }
</script>

<div class="card">
    <div class="card-title">
        <button class="tree-toggle btn btn-sm" on:click={toggle}>
        <span class="toggle-indicator">{expanded ? '−' : '+'}</span>
        </button>
        <div class="badge badge-primary">{node.name}</div>
    </div>
    <div class="card-body">
        <span class="node-name">{node.name}</span>
        <span class="node-type">{node.type}</span>
        {#if node.text}
            <div class="node-text">{node.text}</div>
        {/if}
        {#if node.children.length > 0}
        {#each node.children as child}
        {#if expanded && child.type === 'parameter'}
        <table class="table table-compact table-zebra">
            <thead>
                <tr>
                    <th>Parameter</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                {#if child.children.length > 0}
                {#each child.children as grandchild}
                    <Parameter node={grandchild} />
                {/each}
                {/if}
            </tbody>
        </table>
        {/if}
        {/each}
        {/if}


        
    </div>
    

    <!-- what we do depends on the type of tag. if its a block, recurse, otherwise display it.-->
    {#if expanded && node.children.length > 0}
        <ul transition:slide={{ duration: 200 }}>
            {#each node.children as child}
                <li>
                    {#if (child.type === 'block' || child.type === 'root')}
                        <Tree node={child} />
                    {/if}
                </li>
            {/each}
        </ul>
    {/if}
</div>

<style lang="postcss">
    @references "tailwindcss";
</style>