<script>
    import Stream from "./lib/stream.svelte"
    import User from "./lib/user.svelte"
    import Loading from "./lib/loading.svelte"
    import { get } from "svelte/store";
    import { filter } from "../stores/filter"
    import { reload } from "../stores/reload";
    import { stores } from "../stores/stores";
    import { sendMessage } from "../helpers/helpers"
    import { SORTING } from "../stores/settings";
import { onDestroy } from "svelte";

    let loading = true;
    let filteredStreams = [];
    let filteredFollows = [];

    const filterFollows = (res) => {
        return res.filter(e => !filteredStreams.some(s => s.user_id === e.id))
    }

    stores.followedStreams.subscribe(value => {
        filteredStreams = value;
        loading = false;
    });

    stores.followedUsers.subscribe(value => {
        filteredFollows = filterFollows(value);
        loading = false;
    });

    const unload = reload.subscribe(async (bool) => {
        if (bool) {
            loading = true;
            sendMessage("refresh", false, true);
            $reload = false;
        }
    });

    const unfilter = filter.subscribe(async (val) => {
        const searchTerm = val.toLowerCase();

        const streams = get(stores.followedStreams);
        filteredStreams = streams.filter(stream => {
            return stream.user_name.toLowerCase().includes(searchTerm)
        });

        const res = get(stores.followedUsers);
        const users = filterFollows(res);
        filteredFollows = users.filter(user => {
            return user.display_name.toLowerCase().includes(searchTerm)
        });
    });

    $: {
        switch (get(stores.settings).sortingOption) {
            case SORTING.LARGETOSMALL:
                filteredStreams.sort((a, b) => a.viewer_count < b.viewer_count ? 1 : -1);
                filteredFollows.sort((a, b) => a.view_count < b.view_count ? 1 : -1);
                break;
            case SORTING.SMALLTOLARGE:
                filteredStreams.sort((a, b) => a.viewer_count > b.viewer_count ? 1 : -1);
                filteredFollows.sort((a, b) => a.view_count > b.view_count ? 1 : -1);
                break;
            case SORTING.ALPHABETICALLY:
                filteredStreams.sort((a, b) => a.user_name.localeCompare(b.user_name));
                filteredFollows.sort((a, b) => a.display_name.localeCompare(b.display_name));
                break;
            case SORTING.REVERSEALPHABETICALLY:
                filteredStreams.sort((a, b) => b.user_name.localeCompare(a.user_name));
                filteredFollows.sort((a, b) => b.display_name.localeCompare(a.display_name));
                break;
        }
    }

    onDestroy(() => {
        unload();
        unfilter();
    });
</script>


<div class="overflow-y-scroll flex-1 dark:bg-background">
    {#if !loading}
        {#each filteredStreams as stream}
            <Stream stream={stream}/>
        {/each}
        {#if get(stores.settings).showOfflineChannels}
            {#each filteredFollows as user}
                <User account={user}/>
            {/each}
        {/if}
        {#if filteredStreams.length <= 0 && filteredFollows.length <= 0}
            <h1 class="text-center font-roboto text-xl font-bold mt-10 dark:text-lighttext text-lightlighttext">No results</h1>
        {/if}
    {:else}
        <Loading/>
    {/if}
</div>