<script>
    import Navbar from "./lib/navbar.svelte";
    import Stream from "./lib/stream.svelte";
    import { data, isValid, load, save } from "./twitch/cache.js"
    import { getUser, getFollows, checkAccessToken } from "./twitch/api";
    
    let filteredStreams = [];
    let cache = {};

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
        console.log("heyda")
        chrome.storage.local.clear();
        data.set({});

        promise = loadData();
    }

</script>

<main class="w-[450px] h-[600px] bg-background overflow-hidden flex flex-col border-none">
    <Navbar on:logout={logout} on:inputchange={res => filterStreams(res)} on:refresh={_ => promise = refreshStreams()} promise={promise}/>

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

</main>