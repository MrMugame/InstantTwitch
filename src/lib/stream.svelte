<script>
    export let stream;

    const parseThumbnailUrl = (url, w = 120) => {
        let h = Math.round(w * 9/16);
        url = url.replace("{width}", w.toString());
        url = url.replace("{height}", h.toString());
        return url
    }

    const openTab = () => {
        let url = "https://twitch.tv/" + (stream.user_name).toLowerCase();
        chrome.tabs.create({ url: url });
    }

    const getTime = () => {
        let start_date = new Date(stream.started_at);
        let time_diff = new Date(new Date().getTime() - start_date.getTime());
        let time_string = `${time_diff.getHours()-1}:${time_diff.getMinutes()}:${time_diff.getSeconds()}`
        time_string = time_diff.getDate()-1 > 0 ?  `${time_diff.getDate()-1}:` + time_string : time_string
        return time_string
    }
</script>

<div on:click={openTab} class="w-full h-20 flex p-3 border-b-[1px] dark:text-lighttext text-lightlighttext border-lightborder group cursor-pointer overflow-hidden transition-colors">
    <div class="relative before:absolute before:bottom-0 before:z-10 after:z-10 before:block before:h-0 before:w-full before:bg-twitch before:transition-all after:absolute after:right-0 after:top-0 after:block after:h-full after:w-0 after:bg-twitch after:transition-all group-hover:before:-translate-x-[2px] before:skew-x-[45deg] group-hover:after:-translate-y-[2px] after:skew-y-[45deg] group-hover:before:h-1 group-hover:after:w-1">
        <img class="h-full aspect-video max-w-none group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all z-20" src={parseThumbnailUrl(stream.thumbnail_url)} alt="thumbnail">
        <p class="absolute bottom-0 right-0 px-[1px] bg-black bg-opacity-60 text-strongtext text-xs group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all">{getTime()}</p>
      </div>
    <div class="ml-3">
        <h1 class="text-xl dark:text-strongtext text-lightstrongtext leading-5 font-sans font-bold mb-1">{stream.user_name}</h1>
        <h2 class="font-sans text-xs">{stream.game_name} - {stream.viewer_count} Viewer</h2>
        <h2 class="font-sans w-[300px] overflow-ellipsis whitespace-nowrap overflow-hidden inline-block text-xs">{stream.title}</h2>
    </div>
</div>