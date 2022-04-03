<script>
    import Navbar from "./lib/navbar.svelte";
    import Stream from "./lib/stream.svelte";
    import { data, isValid, load, save } from "./twitch/cache.js"
    import { getUser, getFollows, checkAccessToken } from "./twitch/api";
    import { updateBadgeText } from "./twitch/updates";
import Settings from "./lib/settings.svelte";
    
    let filteredStreams = [];
    let cache = {};

    let page = "streams"

    data.subscribe(val => cache = val);
    
    
    const loadData = async () => {
        let response = await load();
        data.set(response);
        
        if (isValid(cache, 10)) { // 10 min data lifetime
            filteredStreams = cache.streams;
        } else {
            console.log("fetching");
            
            let validToken = await checkAccessToken();
            
            if (validToken?.expires_in > 0) {
                let user = await getUser();
                
                data.set({
                    age: new Date().getTime(),
                    user: user,
                    streams: await getFollows(user.id)
                });
                updateBadgeText(cache.streams.length);
                save(cache);
                filteredStreams = cache.streams;
            } else {
                throw new Error();
            }
        }
    }
    
    const refreshStreams = async () => {
        data.set({
            user: cache.user,
            streams: await getFollows(cache.user.id),
            age: new Date().getTime()
        });
        updateBadgeText(cache.streams.length);
        save(cache);
        filteredStreams = cache.streams;
    }
    

    let promise = loadData();
    
    const filterStreams = async (res) => {
        const searchTerm = res.detail.value.toLowerCase();
        filteredStreams = cache.streams.filter(stream => {
            return stream.user_name.toLowerCase().includes(searchTerm)
        })
    }

    const logout = () => {
        chrome.storage.local.clear();
        data.set({});

        promise = loadData();
    }

    $: {
        console.log(page)
    }

</script>

<main class="w-[450px] h-[600px] bg-background overflow-hidden flex flex-col border-none">
    <Navbar on:logout={logout} on:inputchange={res => filterStreams(res)} on:refresh={_ => promise = refreshStreams()} on:pagechange={res => page = res.detail.page} promise={promise}/>
    
    {#if page === "streams"}
        <div class="overflow-y-scroll flex-1">
            {#await promise}
                <h1 class="text-center font-roboto text-xl font-bold mt-10 text-lighttext">Loading...</h1>
            {:then}
                {#each filteredStreams as stream}
                    <Stream stream={stream}/>
                {/each}
            {:catch}
                <h1 class="text-center font-roboto text-xl font-bold mt-10 text-lighttext">Login first</h1>
            {/await}
        </div>
    {:else if page === "settings"}
        <Settings on:pagechange={res => page = res.detail.page}/>
    {/if}

</main>