<script>
    import Loading from "../lib/loading.svelte"
    import Game from "../lib/game.svelte"
    import { getQueryGames, getTopGames } from "../twitch/api";
    import { onMount } from "svelte";
    import { filter } from "../stores/filter";
    import { reload } from "../stores/reload";

    let games = [];
    let loading = true;

    onMount(async () => {
        games = await getTopGames();
        loading = false;
    });

    reload.subscribe(async (bool) => {
        if (bool) {
            loading = true;
            if ($filter != "") {
                games = await getQueryGames($filter);
            } else {
                games = await getTopGames();
            }
            $reload = false;
            loading = false;
        }
    })

    $: {
        if ($filter != "") {
            getQueryGames($filter).then((res) => games = res);
        } else {
            getTopGames().then((res) => games = res);
        }
    }
</script>

<div class="flex flex-1 justify-center overflow-y-scroll">
    {#if !loading}
        <div class="grid grid-cols-4 pt-3 auto-rows-min">
            {#each games as game}
                <Game game={game}></Game>
            {:else}
                <h1 class="text-center font-sans text-xl font-bold mt-10 dark:text-lighttext text-lightlighttext">No results</h1>
            {/each}
        </div>
    {:else}  
        <Loading/>
    {/if}
</div>
