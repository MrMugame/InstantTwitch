<script>
    import Stream from "../lib/stream.svelte"
    import Loading from "../lib/loading.svelte"
    import { settings, SORTING } from "../twitch/settings";
    import { filter } from "../stores/filter"
    import { loadFollows, loadStreams, refreshStreams } from "../stores/data";
    import { onMount } from "svelte/internal";
    import { reload } from "../stores/reload";
    let loading = true;
    let filteredStreams = [];

    reload.subscribe(async (bool) => {
        if (bool) {
            loading = true;
            filteredStreams = await refreshStreams();
            $reload = false;
            loading = false;
        }
    })

    onMount(async () => {
        filteredStreams = await loadStreams(); 
        loading = false;
    })

    $: {
        const searchTerm = $filter.toLowerCase();
        (async () => {
            const streams = await loadStreams();
            filteredStreams = streams.filter(stream => {
                return stream.user_name.toLowerCase().includes(searchTerm)
            });
        })();
    }

    $: {
        if ($settings.sortingOption === SORTING.LARGETOSMALL) {
            filteredStreams.sort((a, b) => a.viewer_count < b.viewer_count ? 1 : -1);
        } else if ($settings.sortingOption === SORTING.SMALLTOLARGE) {
            filteredStreams.sort((a, b) => a.viewer_count > b.viewer_count ? 1 : -1);
        } else if ($settings.sortingOption === SORTING.ALPHABETICALLY) {
            filteredStreams.sort((a, b) => a.user_name.localeCompare(b.user_name));
        } else if ($settings.sortingOption === SORTING.REVERSEALPHABETICALLY) {
            filteredStreams.sort((a, b) => b.user_name.localeCompare(a.user_name));
        }
    }

</script>


<div class="overflow-y-scroll flex-1 dark:bg-background">
    {#if !loading}
        {#each filteredStreams as stream}
            <Stream stream={stream}/>
        {:else}
            <h1 class="text-center font-roboto text-xl font-bold mt-10 dark:text-lighttext text-lightlighttext">No results</h1>
        {/each}
    {:else}
        <Loading/>
    {/if}
</div>