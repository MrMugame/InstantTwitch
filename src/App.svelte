<script>
    import Router from 'svelte-spa-router'
    import routes from "./routes"
    import Navbar from "./lib/navbar.svelte";
    import Loading from './lib/loading.svelte';
    import Bottombar from "./lib/bottombar.svelte"
    import { loadSettings } from "./twitch/settings";
    import { onMount } from 'svelte/internal';
    import { loadUser } from './stores/data';

    let settings;
    let userPromise = loadUser();

    onMount(async () => {
        settings = await loadSettings();
    })

</script>


<main class={settings?.darkmode ? 'dark' : ''}>
    <div class="w-[450px] h-[600px] dark:bg-background bg-lightbackground overflow-hidden flex flex-col border-none">
        <Navbar userPromise={userPromise}/>
        
        {#await userPromise}
            <Loading/>
        {:then} 
            <Router {routes}/>
        {:catch}
            <h1 class="text-center font-roboto text-xl font-bold mt-10 dark:text-lighttext text-lightlighttext">Login first</h1>
        {/await}

        <Bottombar/>
    </div>
</main>

<style>
    :root {
        color-scheme: dark;
    }
</style>