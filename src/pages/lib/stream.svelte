<script>
    import { createTab } from "../../helpers/helpers";

    export let stream;

    const parseThumbnailUrl = (url, w = 120) => {
        let h = Math.round(w * 9/16);
        url = url.replace("{width}", w.toString());
        url = url.replace("{height}", h.toString());
        return url
    }

    const openTab = () => {
        let url = "https://twitch.tv/" + (stream.user_login).toLowerCase();
        createTab(url)
    }

    const getTime = () => {
        let start_date = new Date(stream.started_at);
        let time_diff = new Date(new Date().getTime() - start_date.getTime());
        let time_string = `${time_diff.getHours()-1}:${time_diff.getMinutes()}:${time_diff.getSeconds()}`
        time_string = time_diff.getDate()-1 > 0 ?  `${time_diff.getDate()-1}:` + time_string : time_string
        return time_string
    }

    const addComma = (num) => {
        return new Intl.NumberFormat('en-GB').format(num)
    }
</script>

<div on:click={openTab} class="w-full h-20 flex p-3 border-b-[1px] dark:text-lighttext text-lightlighttext border-lightborder group cursor-pointer overflow-hidden transition-colors hover:bg-white hover:bg-opacity-[8%]">
    <div class="relative inline h-full before:absolute before:bottom-0 before:z-10 after:z-10 before:block before:h-0 before:w-full before:bg-twitch before:transition-all after:absolute after:right-0 after:top-0 after:block after:h-full after:w-0 after:bg-twitch after:transition-all group-hover:before:-translate-x-[2px] before:skew-x-[45deg] group-hover:after:-translate-y-[2px] after:skew-y-[45deg] group-hover:before:h-1 group-hover:after:w-1">
        <img class="h-full aspect-video max-w-none group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all z-20" src={parseThumbnailUrl(stream.thumbnail_url)} alt="thumbnail">
        <p class="absolute bottom-0 right-0 px-[1px] bg-black bg-opacity-60 text-strongtext text-xs group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all">{getTime()}</p>
    </div>
    <div class="ml-3">
        <div class="flex justify-between items-center w-full">
            <h1 class="text-xl dark:text-strongtext text-lightstrongtext leading-5 font-sans font-bold mb-1">{stream.user_name}</h1>
            <div class="flex items-center">
                <h2 class="text-sm font-sans font-semibold text-red-600">{addComma(stream.viewer_count)}</h2>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-red-600 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            </div>
        </div>
        <h2 class="font-sans text-xs">{stream.game_name}</h2>
        <h2 class="font-sans w-[300px] overflow-ellipsis whitespace-nowrap overflow-hidden block text-xs">{stream.title}</h2>
    </div>
</div>