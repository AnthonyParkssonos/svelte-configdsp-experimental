<script lang="ts">
    // Import necessary stores and utilities
    import { gMainData, gCurrentlyWorking } from '../stores/globalStore';
    import { get } from 'svelte/store';
    import Tree from './Tree.svelte';
    import { read } from '$app/server';

    // Add the logic from configDSP.js here
    let doc : Document;
    let gMaxNumPresets = 20;
    let nodes = "";
    let rootNode : HTMLElement;
    let loaded = false;
    let treeData = {
        name: '',
        type: '',
        text: '',
        value: '',
        readonly: false,
        attributes: {},
        children: []
    };

    // Example function from configDSP.js
    function startCurrentlyWorking() {
        gCurrentlyWorking.set(true);
    }

    function stopCurrentlyWorking() {
        gCurrentlyWorking.set(false);
    }

    const getXMLFromPlayer = async () => {
        // grab the XML from the ip_address in the store
        const store = get(gMainData);
        const ipAddress = store.ip_address;
        console.log('IP Address:', ipAddress);
        const url = `http://${ipAddress}:1400/getDSP?audioSystemsTuning`;
        await fetch(url, { signal: AbortSignal.timeout(10000) }) // 10s timeout
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then((data) => {
                doc = new DOMParser().parseFromString(data, 'text/xml');
                console.log('XML Data:', doc);
            })
            .catch((error) => {
                console.error('Error fetching XML:', error);
            });

        rootNode = doc.documentElement;
        treeData = parseXMLToTree(rootNode);
        console.log('Tree Data:', treeData);
        loaded = true;

    }

    const parseXMLToTree = (node) => {
        // Example function to parse XML to tree structure
        return {
            name: node.getAttribute('name') || "Root",
            // Get only the direct text content, not including child elements
            id: node.getAttribute('id') || '',
            type: node.nodeName || 'root',
            value: node.getAttribute('value') || '',
            text: Array.from(node.childNodes)
                .filter(child => child.nodeType === Node.TEXT_NODE)
                .map(child => child.textContent?.trim())
                .join('')
                .trim() || '',
            // Get attributes as an object
            attributes: '',
            readonly: node.getAttribute('readonly') === 'true',
            vartype: node.getAttribute('vartype') || '',
            // Recursively process child elements
            children: Array.from(node.children).map(child => parseXMLToTree(child))
        };
    }

    const dumpNodes = () => {
        // Example function to dump nodes
        // print all child nodes recursively
        const printNodes = (node, depth = 0) => {
            const indent = ' '.repeat(depth * 2);
            nodes += `${indent}${node.nodeName}: ${node.textContent}\n`;
            nodes += "<br>";
            console.log(`${indent}${node.nodeName}: ${node.textContent}`);
            for (let i = 0; i < node.childNodes.length; i++) {
                printNodes(node.childNodes[i], depth + 1);
            }
        };
        if (gXmlDoc) {
            const root = gXmlDoc.documentElement;
            console.log('Root Node:', root.nodeName);
            for (let i = 0; i < root.childNodes.length; i++) {
                printNodes(root.childNodes[i]);
            }
        } else {
            console.error('No XML document available');
        }
    }


</script>

<div>
    <!-- Add your HTML structure here -->
    <h1>Config DSP</h1>
    <button class="btn btn-accent" on:click={async () => { await getXMLFromPlayer(); }}>Get XML from Player</button>
    <button class="btn btn-primary" on:click={dumpNodes}>Dump Nodes</button>
</div>


    <div class="ml-8 lg:m-8 md:m-4 lg:w-1/2">
        <!-- populate blocks from doc -->
        <!-- Add any additional HTML structure here -->
         {#if loaded}
         <Tree
            node={treeData}
        />
        {/if}
    </div>

<style>
    @reference "tailwindcss";
    /* Add styles here */
</style>