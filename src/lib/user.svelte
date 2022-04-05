<script>
    import { createEventDispatcher } from "svelte";
    import { data } from "/twitch/cache.js";
    import { page } from "/twitch/page.js";

    let dispatch = createEventDispatcher();

    let user;

    data.subscribe(value => user = value.user || {});

</script>

<div class="outside py-1">
    <div class="flex items-center h-full">
        <h2 class="mx-2 font-roboto text-strongtext font-semibold text-[15px]">{user.display_name}</h2>
        <img class="w-6 h-6 rounded-full" src={user.profile_image_url} alt="profile pic">
    </div>

    <div class="absolute bg-background border-[1px] border-lightborder w-32 text-sm text-strongtext font-semibold top-full right-0 hidden dropdown">
        <h2 class="p-1 hover:bg-twitch select-none" on:click={_ => page.set("settings")}>Settings</h2>
        <h2 class="p-1 hover:bg-twitch select-none" on:click={_ => dispatch("logout", {})}>Logout</h2>
    </div>
</div>

<style>
    .outside:hover .dropdown {
        display: block;
    }
</style>