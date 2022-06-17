<script>
    import Router from 'svelte-spa-router'
    import routes from "./routes"
    import Navbar from "./lib/navbar.svelte";
    import Loading from './lib/loading.svelte';
    import Bottombar from "./lib/bottombar.svelte"
    import { settings } from "./twitch/settings";
    import { onMount } from 'svelte/internal';
    import { loadUser } from './stores/data';
    import { location } from "svelte-spa-router"
    import { filter } from './stores/filter';

    let userPromise = loadUser();

    onMount(async () => {
        await settings.load();
    });

    location.subscribe(() => {
        $filter = "";
    })


</script>


<main class={$settings?.darkmode ? 'dark' : ''}>
    <div class="w-[450px] h-[600px] dark:bg-background bg-lightbackground overflow-hidden flex flex-col border-none -z-20">
        <Navbar userPromise={userPromise}/>
        
        {#await userPromise}
            <Loading/>
        {:then}
            <Router {routes}/>
        {:catch}
            <h1 class="text-center font-sans text-xl font-bold mt-10 dark:text-lighttext text-lightlighttext">Login first</h1>
        {/await}

        <Bottombar/>
    </div>
</main>

<style>
    :root {
        color-scheme: dark;
    }
</style>