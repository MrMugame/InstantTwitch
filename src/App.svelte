<script>
    import Navbar from "./lib/navbar.svelte";
    import Stream from "./lib/stream.svelte";
    import Settings from "./lib/settings.svelte";
    import { page } from "./twitch/page";
    import { loadData } from "./twitch/state";
    import { data } from "./twitch/cache";
    import { loadSettings, SORTING } from "./twitch/settings";
    
    let filteredStreams = [];

    data.subscribe(val => filteredStreams = val.streams || []);

    let promise = loadData();

    let settings = {};
    
    const reloadSettings = async () => {
        settings = await loadSettings();
        
        if (settings.sortingOption === SORTING.LARGETOSMALL) {
            filteredStreams.sort((a, b) => a.viewer_count < b.viewer_count ? 1 : -1);
        } else if (settings.sortingOption === SORTING.SMALLTOLARGE) {
            filteredStreams.sort((a, b) => a.viewer_count > b.viewer_count ? 1 : -1);
        } else if (settings.sortingOption === SORTING.ALPHABETICALLY) {
            filteredStreams.sort((a, b) => a.user_name.localeCompare(b.user_name));
        } else if (settings.sortingOption === SORTING.REVERSEALPHABETICALLY) {
            filteredStreams.sort((a, b) => a.user_name.localeCompare(b.user_name));
            filteredStreams.reverse();
        }
    }
    reloadSettings();


</script>

<main class={settings.darkmode ? 'dark' : ''}>
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
            <Settings on:reload={reloadSettings} />
        {/if}
    </div>
</main>