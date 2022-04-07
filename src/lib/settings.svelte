<script>
    import Selectsetting from "./selectsetting.svelte";
    import { createEventDispatcher } from "svelte";
    import { page } from "/twitch/page.js";
    import { loadSettings, saveSettings } from "/twitch/settings";

    let dispatch = createEventDispatcher();

    let settings;
    let loading = true;

    loadSettings().then(res => {
        settings = res;
        loading = false;
    });

    let intervalOptions = [
        1,
        2.5,
        5,
        10,
        15,
        30,
    ]

    $: {
        if (settings != undefined) {
            saveSettings(settings);
        }
        dispatch("reload", {});
    }

</script>


<div class="flex flex-col p-2 ">
    <div class="flex justify-between mb-5">
        <svg on:click={_ => page.set("streams")} xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover: dark:stroke-lighttext stroke-lightstrongtext dark:hover:stroke-strongtext hover:stroke-lightlighttext" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <h2 class="font-roboto dark:text-lighttext text-lightlighttext font-semibold text-base mx-6">Settings</h2>
    </div>

    {#if !loading}
        <Selectsetting name="Update interval:" options={intervalOptions} bind:selected={settings.fetchCycle}/>

        <Selectsetting name="Data lifetime:" options={intervalOptions} bind:selected={settings.dataLifeTime}/>

        <div class="flex items-center my-2">
            <h3 class="text-base font-roboto dark:text-strongtext text-lightstrongtext font-semibold">Notifications:</h3>
            <input class="mx-5 accent-twitch" type="checkbox" name="scales" bind:checked={settings.notifications}>
        </div>

        <div class="flex items-center my-2">
            <h3 class="text-base font-roboto dark:text-strongtext text-lightstrongtext font-semibold">Darkmode:</h3>
            <input class="mx-5 accent-twitch" type="checkbox" name="scales" bind:checked={settings.darkmode}>
        </div>

    {/if}
</div>