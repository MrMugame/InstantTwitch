<script>
    import Navbar from "./lib/navbar.svelte";
    import Stream from "./lib/stream.svelte";
    import Settings from "./lib/settings.svelte";
    import { page } from "./twitch/page";
    import { loadData } from "./twitch/state";
    import { data } from "./twitch/cache";
    
    let filteredStreams = [];

    data.subscribe(val => filteredStreams = val.streams || []);
    
    let currentPage = "streams"
    page.subscribe(val => currentPage = val);

    let promise = loadData();

</script>

<main class="w-[450px] h-[600px] bg-background overflow-hidden flex flex-col border-none">
    <Navbar bind:filteredStreams={filteredStreams} bind:promise={promise}/>
    
    {#if currentPage === "streams"}
        <div class="overflow-y-scroll flex-1">
            {#await promise}
                <h1 class="text-center font-roboto text-xl font-bold mt-10 text-lighttext">Loading...</h1>
            {:then}
                {#each filteredStreams as stream}
                    <Stream stream={stream}/>
                {/each}
            {:catch}
                <h1 class="text-center font-roboto text-xl font-bold mt-10 text-lighttext">Login first</h1>
            {/await}
        </div>
    {:else if currentPage === "settings"}
        <Settings/>
    {/if}

</main>