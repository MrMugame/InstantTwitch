<script>
    export let game;

    const parseThumbnailUrl = (url, w = 240) => {
        let h = Math.round(w * 4/3);
        url = url.replace("{width}", w.toString());
        url = url.replace("{height}", h.toString());
        return url
    }

    const openTab = () => {
        let url = "http://twitch.tv/directory/game/" + (game.name).toLowerCase();
        chrome.tabs.create({ url: url });
    }
</script>

<div class="w-[95px] mb-3">
    <div class="bg-twitch">
        <img class="w-full aspect-auto hover:-translate-x-1 hover:-translate-y-1 transition-all" src={parseThumbnailUrl(game.box_art_url)} alt="thumbnail" on:click={() => openTab()}>
    </div>
    <h1 class="text-base dark:text-strongtext text-lightstrongtext font-roboto font-bold text-ellipsis whitespace-nowrap overflow-hidden my-[2px]">{game.name}</h1>
</div>