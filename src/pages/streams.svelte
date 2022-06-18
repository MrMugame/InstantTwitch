<script>
    import Stream from "../lib/stream.svelte"
    import User from "../lib/user.svelte"
    import Loading from "../lib/loading.svelte"
    import { getQueryStreams, getTopStreams } from "../twitch/api";
    import { onMount } from "svelte";
    import { reload } from "../stores/reload";
    import { filter } from "../stores/filter";

    let streams = [];
    let topstreams = [];
    let cursor = "";
    let searchCursor = "";
    let loadingMore = false;
    let loading = true;
    let box;

    onMount(async () => {
        let data = await getTopStreams();
        topstreams = data.data;
        cursor = data.cursor;
        streams = topstreams;
        loading = false;
    });

    const loadMore = async () => {
        loadingMore = true;
        if (searchCursor != "") {
            let data = await getQueryStreams($filter, searchCursor);
            streams = [...streams, ...data.data];
            searchCursor = data.pagination.cursor;
        } else {
            let data = await getTopStreams(24, cursor);
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

    reload.subscribe(async (bool) => {
        if (bool) {
            loading = true;
            if ($filter != "") {
                streams = (await getQueryStreams($filter)).data;
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
    filter.subscribe(async val => {
        clearTimeout(timeout);
        timeout = setTimeout(async () => {
            if (val != "") {
                box.scrollTo(0, 0);
                let res = await getQueryStreams(val);
                searchCursor = res.cursor;
                streams = res.data;
            } else {
                box.scrollTo(0, 0);
                searchCursor = "";
                streams = topstreams;
            }
        }, 500);
    });
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