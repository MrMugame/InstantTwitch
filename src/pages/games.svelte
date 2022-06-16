<script>
    import Loading from "../lib/loading.svelte"
    import Game from "../lib/game.svelte"
    import { getTopGames } from "../twitch/api";
    import { onMount } from "svelte";

    let games = [];

    onMount(async () => {
        games = await getTopGames();
    })
</script>

<div class="flex overflow-y-scroll flex-1 flex-wrap justify-evenly p-1 pt-3">
    {#each games as game}
        <Game game={game}></Game>
    {:else}
        <Loading/>
    {/each}
</div>