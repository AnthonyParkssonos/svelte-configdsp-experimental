<script>
	import Block from './Block.svelte';
	import Tree from './Tree.svelte';
	import { slide } from 'svelte/transition';

	let { expanded = $bindable(false), name, blocks } = $props();

	function toggle() {
		expanded = !expanded;
	}
</script>

<button class="btn" class:expanded onclick={toggle}>{name}</button>

	<ul transition:slide={{ duration: 300 }}>
		{#each blocks as block}
        <script>
            console.log('Block:', block);
        </script>
			<li>
                <Block title={block.name} text={block.text} />
			</li>
		{/each}
	</ul>


<style>
    @reference "tailwindcss";
</style>