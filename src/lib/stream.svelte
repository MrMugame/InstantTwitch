<script>
    export let stream;

    const parseThumbnailUrl = (url, w = 120) => {
        let h = Math.round(w * 9/16);
        url = url.replace("{width}", w.toString());
        url = url.replace("{height}", h.toString());
        return url
    }

    const openTab = () => {
        let url = "http://twitch.tv/" + (stream.user_name).toLowerCase();
        chrome.tabs.create({ url: url })
    }

    const getTime = () => {
        let start_date = new Date(stream.started_at);
        let time_diff = new Date(new Date().getTime() - start_date.getTime());
        let time_string = `${time_diff.getHours()-1}:${time_diff.getMinutes()}:${time_diff.getSeconds()}`
        time_string = time_diff.getDate()-1 > 0 ?  `${time_diff.getDate()-1}:` + time_string : time_string
        return time_string
    }
</script>

<div on:click={openTab} class="w-full h-20 flex  p-3 border-b-[1px] dark:text-lighttext text-lightlighttext hover:text-lighttext border-lightborder hover:bg-twitch cursor-pointer overflow-hidden transition-colors">
    <div class="relative h-full">
        <img class="h-full aspect-video max-w-none" src={parseThumbnailUrl(stream.thumbnail_url)} alt="thumbnail">
        <p class="absolute bottom-0 right-0 px-[1px] bg-black bg-opacity-60 text-strongtext text-xs">{getTime()}</p>
    </div>
    <div class="ml-3">
        <h1 class="text-xl dark:text-strongtext text-lightstrongtext bg-opacity-5 leading-5 font-roboto font-bold mb-1">{stream.user_name}</h1>
        <h2 class="font-roboto text-xs">{stream.game_name} - {stream.viewer_count} Viewer</h2>
        <h2 class="font-roboto w-[300px] overflow-ellipsis whitespace-nowrap overflow-hidden inline-block text-xs">{stream.title}</h2>
    </div>
</div>