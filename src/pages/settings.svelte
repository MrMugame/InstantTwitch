<script>
    import { createEventDispatcher } from "svelte";
    import { loadSettings, saveSettings, SORTING } from "../twitch/settings";
    import Selectsetting from "../lib/selectsetting.svelte";
    import Checkboxsetting from "../lib/checkboxsetting.svelte";
    import Loading from "../lib/loading.svelte"
    
    let dispatch = createEventDispatcher();

    let settings;

    let settingsPromise = loadSettings();
        settingsPromise.then(res => {
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
    {#await settingsPromise}
        <Loading/>
    {:then}
        <Selectsetting name="Update interval" options={intervalOptions} bind:selected={settings.fetchCycle}/>

        <Selectsetting name="Data lifetime" options={intervalOptions} bind:selected={settings.dataLifeTime}/>

        <Checkboxsetting name="Notifications" bind:checked={settings.notifications}/>

        <Checkboxsetting name="Darkmode" bind:checked={settings.darkmode}/>

        <Selectsetting name="Sorting" options={sortingOptions} bind:selected={settings.sortingOption}/>

        <h2 class="p-1 hover:bg-twitch select-none" on:click={() => console.log("logout")}>Logout</h2>
    {/await}
</div>