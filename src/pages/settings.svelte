<script>
    import Selectsetting from "./lib/selectsetting.svelte";
    import Checkboxsetting from "./lib/checkboxsetting.svelte";
    import Buttonsetting from "./lib/buttonsetting.svelte";
    import { logout } from "../helpers/helpers";
    import { stores } from "../stores/stores";
    import { SORTING } from "../stores/settings";


    let settings = stores.settings;

    settings.set({...$settings, valid: true});

    let intervalOptions = {
        "1min": 1, 
        "2.5min": 2.5, 
        "5min": 5, 
        "10min": 10,
        "15min": 15, 
        "30min": 30
    }

    let sortingOptions = {
        "Viewercount ascending": SORTING.SMALLTOLARGE, 
        "Viewercount descending": SORTING.LARGETOSMALL, 
        "Alphabetically": SORTING.ALPHABETICALLY,
        "Reverse alphabetically": SORTING.REVERSEALPHABETICALLY
    }
</script>


<div class="flex flex-col p-2 px-5">

    <h1 class="font-sans text-xl font-bold dark:text-strongtext text-lightstrongtext after:w-full after:h-[2px] dark:after:bg-strongborder after:bg-lightborder after:top-0 after:left-0 after:relative after:block">Notifications</h1>
    <Checkboxsetting name="Notifications" bind:checked={$settings.notifications}/>
    <Selectsetting name="Update interval" options={intervalOptions} bind:selected={$settings.fetchCycle}/>

    <h1 class="font-sans text-xl font-bold dark:text-strongtext text-lightstrongtext after:w-full after:h-[2px] dark:after:bg-strongborder after:bg-lightborder after:top-0 after:left-0 after:relative after:block mt-5">Appearance</h1>
    <Checkboxsetting name="Darkmode" bind:checked={$settings.darkmode}/>
    <Selectsetting name="Sorting" options={sortingOptions} bind:selected={$settings.sortingOption}/>
    <Checkboxsetting name="Show Offline channels" bind:checked={$settings.showOfflineChannels}/>
    
    <h1 class="font-sans text-xl font-bold dark:text-strongtext text-lightstrongtext after:w-full after:h-[2px] dark:after:bg-strongborder after:bg-lightborder after:top-0 after:left-0 after:relative after:block mt-5">Account</h1>
    
    <Buttonsetting name="Logout" on:click={() => logout()}></Buttonsetting>
</div>