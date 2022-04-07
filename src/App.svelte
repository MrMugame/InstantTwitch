<script>
    import Navbar from "./lib/navbar.svelte";
    import Stream from "./lib/stream.svelte";
    import Settings from "./lib/settings.svelte";
    import { page } from "./twitch/page";
    import { loadData } from "./twitch/state";
    import { data } from "./twitch/cache";
    import { loadSettings } from "./twitch/settings";
    
    let filteredStreams = [];

    data.subscribe(val => filteredStreams = val.streams || []);

    let promise = loadData();

    let darkmode = false;
    loadSettings().then(res => darkmode = res.darkmode);

    $: {
        console.log(darkmode)
    }

</script>

<main class={darkmode ? 'dark' : ''}>
    <div class="w-[450px] h-[600px] dark:bg-background bg-lightbackground overflow-hidden flex flex-col border-none">
        <Navbar bind:filteredStreams={filteredStreams} bind:promise={promise}/>
    
        {#if $page === "streams"}
            <div class="overflow-y-scroll flex-1 dark:bg-background">
                {#await promise}
                    <h1 class="text-center font-roboto text-xl font-bold mt-10 dark:text-lighttext text-lightlighttext">Loading...</h1>
                {:then}
                    {#each filteredStreams as stream}
                        <Stream stream={stream}/>
                    {/each}
                {:catch}
                    <h1 class="text-center font-roboto text-xl font-bold mt-10 dark:text-lighttext text-lightlighttext">Login first</h1>
                {/await}
            </div>
        {:else if $page === "settings"}
            <Settings/>
        {/if}
    </div>
</main>