<script>
    import Stream from "../lib/stream.svelte"
    import User from "../lib/user.svelte"
    import Loading from "../lib/loading.svelte"
    import { settings, SORTING } from "../twitch/settings";
    import { filter } from "../stores/filter"
    import { loadFollows, loadStreams, refreshStreams } from "../stores/data";
    import { onMount } from "svelte/internal";
    import { reload } from "../stores/reload";
    let loading = true;
    let filteredStreams = [];
    let filteredFollows = [];

    reload.subscribe(async (bool) => {
        if (bool) {
            loading = true;
            filteredStreams = await refreshStreams();
            if ($settings.hideOfflineChannels) {
                let res = await loadFollows();
                filteredFollows = res.filter(e => !filteredStreams.some(s => s.user_id == e.id));
            }
            $reload = false;
            loading = false;
        }
    })

    onMount(async () => {
        filteredStreams = await loadStreams(); 
        if ($settings.hideOfflineChannels) {
            let res = await loadFollows();
            filteredFollows = res.filter(e => !filteredStreams.some(s => s.user_id === e.id));
        }
        loading = false;
    })

    $: {
        const searchTerm = $filter.toLowerCase();
        (async () => {
            const streams = await loadStreams();
            filteredStreams = streams.filter(stream => {
                return stream.user_name.toLowerCase().includes(searchTerm)
            });

            let res = await loadFollows();
            let users = res.filter(e => !filteredStreams.some(s => s.user_id == e.id));
            filteredFollows = users.filter(user => {
                return user.display_name.toLowerCase().includes(searchTerm)
            });
        })();
    }

    $: {
        if ($settings.sortingOption === SORTING.LARGETOSMALL) {
            filteredStreams.sort((a, b) => a.viewer_count < b.viewer_count ? 1 : -1);
            filteredFollows.sort((a, b) => a.view_count < b.view_count ? 1 : -1);
        } else if ($settings.sortingOption === SORTING.SMALLTOLARGE) {
            filteredStreams.sort((a, b) => a.viewer_count > b.viewer_count ? 1 : -1);
            filteredFollows.sort((a, b) => a.view_count > b.view_count ? 1 : -1);
        } else if ($settings.sortingOption === SORTING.ALPHABETICALLY) {
            filteredStreams.sort((a, b) => a.user_name.localeCompare(b.user_name));
            filteredFollows.sort((a, b) => a.display_name.localeCompare(b.display_name));
        } else if ($settings.sortingOption === SORTING.REVERSEALPHABETICALLY) {
            filteredStreams.sort((a, b) => b.user_name.localeCompare(a.user_name));
            filteredFollows.sort((a, b) => b.display_name.localeCompare(a.display_name));
        }
    }

</script>


<div class="overflow-y-scroll flex-1 dark:bg-background">
    {#if !loading}
        {#each filteredStreams as stream}
            <Stream stream={stream}/>
        {/each}
        {#if $settings.hideOfflineChannels}
            {#each filteredFollows as user}
                <User account={user}/>
            {:else}
                <h1 class="text-center font-roboto text-xl font-bold mt-10 dark:text-lighttext text-lightlighttext">No results</h1>
            {/each}
        {/if}
    {:else}
        <Loading/>
    {/if}
</div>