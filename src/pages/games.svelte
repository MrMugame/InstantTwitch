<script>
    import Loading from "../lib/loading.svelte"
    import Game from "../lib/game.svelte"
    import { getQueryGames, getTopGames } from "../twitch/api";
    import { onMount } from "svelte";
    import { filter } from "../stores/filter";
    import { reload } from "../stores/reload";

    let topgames = [];
    let games = [];
    let loading = true;
    let cursor = "";
    let searchCursor = "";

    let box;
    let loadingMore = false;

    onMount(async () => {
        await loadMore();
        loading = false;
    });

    const loadMore = async () => {
        loadingMore = true;
        if (searchCursor != "") {
            let data = await getQueryGames($filter, searchCursor);
            games = [...games, ...data.data];
            searchCursor = data.pagination.cursor;
        } else {
            let data = await getTopGames(24, cursor);
            topgames = [...topgames, ...data.data]
            games = topgames;
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
                games = (await getQueryGames($filter)).data;
            } else {
                loadingMore = true;
                cursor = "";
                topgames = [];
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
                box?.scrollTo(0, 0);
                let res = await getQueryGames(val);
                searchCursor = res.cursor;
                games = res.data;
            } else {
                box?.scrollTo(0, 0);
                searchCursor = "";
                games = topgames;
            }
        }, 500);
    });
</script>

<div on:scroll={update} bind:this={box} class="flex flex-1 justify-center overflow-y-scroll">
    {#if !loading}
        <div class="grid grid-cols-4 pt-3 auto-rows-min">
            {#each games as game}
                <Game game={game}></Game>
            {:else}
                <h1 class="text-center font-sans text-xl font-bold mt-10 dark:text-lighttext text-lightlighttext col-span-4">No results</h1>
            {/each}
        </div>
    {:else}  
        <Loading/>
    {/if}
</div>
