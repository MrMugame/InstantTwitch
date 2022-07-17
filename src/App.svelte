<script>
    import Router from 'svelte-spa-router'
    import routes from "./routes"
    import Navbar from "./pages/lib/navbar.svelte";
    import Loading from './pages/lib/loading.svelte';
    import Bottombar from "./pages/lib/bottombar.svelte"
    import { location } from "svelte-spa-router"
    import { filter } from './stores/filter';
    import { initStores, stores, subscribeStores } from './stores/stores';

    let settings = stores.settings;

    let userPromise = initStores(stores);
    subscribeStores(stores);

    location.subscribe(() => {
        $filter = "";
    });

    $: document.documentElement.style.setProperty('color-scheme', $settings?.darkmode ? 'dark' : 'light');
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