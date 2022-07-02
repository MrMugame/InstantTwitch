<script>
import { createTab } from "../../helpers/helpers";


    export let game;

    const parseThumbnailUrl = (url, w = 120) => {
        let h = Math.round(w * 4/3);
        url = url.replace("52x72", `${w.toString()}x${h.toString()}`);
        url = url.replace("{width}", w.toString());
        url = url.replace("{height}", h.toString());
        return url
    }

    const openTab = () => {
        let url = "https://twitch.tv/directory/game/" + (game.name).toLowerCase();
        createTab(url);
    }
</script>

<div class="w-[95px] mb-3 mx-1">
    <div class="group relative before:absolute before:bottom-0 before:z-10 after:z-10 before:block before:h-0 before:w-full before:bg-twitch before:transition-all after:absolute after:right-0 after:top-0 after:block after:h-full after:w-0 after:bg-twitch after:transition-all hover:before:-translate-x-[2px] before:skew-x-[45deg] hover:after:-translate-y-[2px] after:skew-y-[45deg] hover:before:h-1 hover:after:w-1">
        <img class="w-full aspect-auto group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all" src={parseThumbnailUrl(game.box_art_url)} alt="thumbnail" on:click={() => openTab()}>
    </div>
    <h1 class="text-base dark:text-strongtext text-lightstrongtext font-sans font-bold text-ellipsis whitespace-nowrap overflow-hidden my-[2px]">{game.name}</h1>
</div>