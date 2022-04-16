<script>
    import Selectsetting from "./selectsetting.svelte";
    import Checkboxsetting from "./checkboxsetting.svelte";
    import { createEventDispatcher } from "svelte";
    import { page } from "/twitch/page.js";
    import { loadSettings, saveSettings, SORTING } from "/twitch/settings";

    let dispatch = createEventDispatcher();

    let settings;

    let promise = loadSettings()
    promise.then(res => {
        settings = res;
    });

    let intervalOptions = {
        "1min": 1, 
        "2.5min": 2.5, 
        "5min": 5, 
        "10min": 10, 
        "15min": 15, 
        "30min": 30
    }

    let sortingOptions = {
        "small to large": SORTING.SMALLTOLARGE, 
        "large to small": SORTING.LARGETOSMALL, 
        "alphabetically": SORTING.ALPHABETICALLY,
        "reverse alphabetically": SORTING.REVERSEALPHABETICALLY
    }

    $: {
        if (settings != undefined) {
            saveSettings(settings);
            dispatch("reload", {});
        }
    }

</script>


<div class="flex flex-col p-2 px-5">
    <div class="flex justify-between mb-5">
        <svg on:click={_ => page.set("streams")} xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover: dark:stroke-lighttext stroke-lightstrongtext dark:hover:stroke-strongtext hover:stroke-lightlighttext" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <h2 class="font-roboto dark:text-lighttext text-lightlighttext font-semibold text-base mx-6">Settings</h2>
    </div>


    {#await promise}
        <h1>test</h1>
    {:then}
        <Selectsetting name="Update interval" options={intervalOptions} bind:selected={settings.fetchCycle}/>

        <Selectsetting name="Data lifetime" options={intervalOptions} bind:selected={settings.dataLifeTime}/>

        <Checkboxsetting name="Notifications" bind:checked={settings.notifications}/>

        <Checkboxsetting name="Darkmode" bind:checked={settings.darkmode}/>

        <Selectsetting name="Sorting" options={sortingOptions} bind:selected={settings.sortingOption}/>
    {/await}
</div>