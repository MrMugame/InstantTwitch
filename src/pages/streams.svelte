<script>
    import Stream from "./lib/stream.svelte"
    import User from "./lib/user.svelte"
    import Loading from "./lib/loading.svelte"
    import { onDestroy, onMount } from "svelte";
    import { reload } from "../stores/reload";
    import { filter } from "../stores/filter";
    import { fetchQueryStreams, fetchTopStreams } from "../helpers/api";

    let streams = [];
    let topstreams = [];
    let cursor = "";
    let searchCursor = "";
    let loadingMore = false;
    let loading = true;
    let box;

    onMount(async () => {
        let data = await fetchTopStreams();
        topstreams = data.data;
        cursor = data.cursor;
        streams = topstreams;
        loading = false;
    });

    const loadMore = async () => {
        loadingMore = true;
        if (searchCursor != "") {
            let data = await fetchQueryStreams($filter, searchCursor);
            streams = [...streams, ...data.data];
            searchCursor = data.pagination.cursor;
        } else {
            let data = await fetchTopStreams(24, cursor);
            topstreams = [...topstreams, ...data.data]
            streams = topstreams;
            cursor = data.pagination.cursor;
        }
    }

    const update = async () => {
        let trigger = (box.scrollHeight - box.clientHeight) - 0.08 * box.scrollHeight;
        if (trigger < box.scrollTop) {
            if (!loadingMore) {
                loadingMore = true;
                await loadMore();
            }
        } else {
            loadingMore = false;
        }
    }

    const unload = reload.subscribe(async (bool) => {
        if (bool) {
            loading = true;
            if ($filter != "") {
                streams = (await fetchQueryStreams($filter)).data;
            } else {
                loadingMore = true;
                cursor = "";
                topstreams = [];
                await loadMore();
            }
            $reload = false;
            loading = false;
        }
    })
    
    let timeout;
    const unfilter = filter.subscribe(async val => {
        clearTimeout(timeout);
        timeout = setTimeout(async () => {
            if (val != "") {
                box?.scrollTo(0, 0);
                let res = await fetchQueryStreams(val);
                searchCursor = res.cursor;
                streams = res.data;
            } else {
                box?.scrollTo(0, 0);
                searchCursor = "";
                streams = topstreams;
            }
        }, 500);
    });

    onDestroy(() => {
        unload();
        unfilter();
    })
</script>

<div bind:this={box} on:scroll={update} class="overflow-y-scroll flex-1">
    {#if !loading}
            {#each streams as stream}
                {#if searchCursor == ""}
                    <Stream stream={stream}/>
                {:else}
                    <User user={stream}/>
                {/if}
            {:else}
                <h1 class="text-center font-sans text-xl font-bold mt-10 dark:text-lighttext text-lightlighttext col-span-4">No results</h1>
            {/each}
    {:else}
        <Loading/>
    {/if}
</div>