<script>
    import Router from 'svelte-spa-router'
    import routes from "./routes"
    import Navbar from "./lib/navbar.svelte";
    import Bottombar from "./lib/bottombar.svelte"
    import { loadSettings } from "./twitch/settings";
    import { promise } from "./stores/promise"
    import { data } from "./stores/cache";
    
    let settings;

    $promise = data.loadData();

    const load = async () => settings = await loadSettings();

    load();
</script>


<main class={settings?.darkmode ? 'dark' : ''}>
    <div class="w-[450px] h-[600px] dark:bg-background bg-lightbackground overflow-hidden flex flex-col border-none">
        <Navbar/>
    
        <Router {routes}/>

        <Bottombar/>
    </div>
</main>

<style>
    :root {
        color-scheme: dark;
    }
</style>