<script>
    export let user;

    const openTab = () => {
        let url = "https://twitch.tv/" + (user.broadcaster_login).toLowerCase();
        chrome.tabs.create({ url: url });
    }
</script>

<div on:click={openTab} class="border-b-[1px] dark:text-lighttext text-lightlighttext border-lightborder flex p-3 hover:bg-white hover:bg-opacity-[8%] items-center">
    <img src={user.thumbnail_url} class="w-14 h-14 rounded-full { user.is_live ? "border-[3px]" : ""} border-red-600" alt="profile pic">

    <div class="ml-3 inline-block cursor-pointer">
        <h1 class="text-xl dark:text-strongtext text-lightstrongtext leading-5 font-sans font-bold mb-1 select-none">{user.display_name}</h1>
        <h2 class="font-sans text-xs select-none">{user.game_name}</h2>
        <h2 class="font-sans w-[320px] overflow-ellipsis whitespace-nowrap overflow-hidden inline-block text-xs select-none leading-none">{user.title}</h2>
    </div>
</div>