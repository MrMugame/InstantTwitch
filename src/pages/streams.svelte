<script>
    import Stream from "../lib/stream.svelte"
    import { data } from "../stores/cache";
    import { loadSettings, SORTING } from "../twitch/settings";
    import { promise } from "../stores/promise"
    import { filter } from "../stores/filter"

    let filteredStreams = $data.streams || [];

    $promise = data.loadData();

    let settings = {};
    const reloadSettings = async () => settings = await loadSettings()
    reloadSettings();


    $: {
        const searchTerm = $filter.toLowerCase();
        data.isValid().then(valid => {
            if (valid) {
                filteredStreams = $data.streams.filter(stream => {
                    return stream.user_name.toLowerCase().includes(searchTerm)
                });
            }
        })
    }

    $: {
        if (settings.sortingOption === SORTING.LARGETOSMALL) {
            filteredStreams.sort((a, b) => a.viewer_count < b.viewer_count ? 1 : -1);
        } else if (settings.sortingOption === SORTING.SMALLTOLARGE) {
            filteredStreams.sort((a, b) => a.viewer_count > b.viewer_count ? 1 : -1);
        } else if (settings.sortingOption === SORTING.ALPHABETICALLY) {
            filteredStreams.sort((a, b) => a.user_name.localeCompare(b.user_name));
        } else if (settings.sortingOption === SORTING.REVERSEALPHABETICALLY) {
            filteredStreams.sort((a, b) => b.user_name.localeCompare(a.user_name));
        }
    }

</script>


<div class="overflow-y-scroll flex-1 dark:bg-background">
    {#await $promise}
        <h1 class="text-center font-roboto text-xl font-bold mt-10 dark:text-lighttext text-lightlighttext">Loading...</h1>
    {:then}
        {#each filteredStreams as stream}
            <Stream stream={stream}/>
        {/each}
    {:catch}
        <h1 class="text-center font-roboto text-xl font-bold mt-10 dark:text-lighttext text-lightlighttext">Login first</h1>
    {/await}
</div>