<script>
    import Navbar from "./lib/navbar.svelte";
    import Stream from "./lib/stream.svelte";
    import { data, isValid, load, save } from "./twitch/cache.js"
    import { getUser, getFollows, checkAccessToken } from "./twitch/api";
    
    let loading = true;
    let validAccessToken = false;
    let filteredStreams = [];
    let cache = {};

    
    data.subscribe(val => cache = val);

    load().then(res => {
        data.set(res)

        if (!isValid(cache, 10)) { // 10 min data lifetime
            console.log("fetching")
            checkAccessToken().then(async (res) => {
                validAccessToken = (res?.status == 200 && res?.data?.expires_in > 0);
                if (validAccessToken) {
                    let user = await getUser();
                    data.set({
                        age: new Date().getTime(),
                        user: user,
                        streams: await getFollows(user.id)
                    });
                    save(cache);
                    filteredStreams = cache.streams;
                    loading = false;
                }
            }).catch(e => {
                validAccessToken = false;
                loading = true;
            })
        } else {
            loading = false;
            validAccessToken = true;
            filteredStreams = cache.streams;
        }
    });



    const filterStreams = async (res) => {
        const searchTerm = res.detail.value.toLowerCase();
        filteredStreams = cache.streams.filter(stream => {
            return stream.user_name.toLowerCase().includes(searchTerm)
        })
    }

    const refreshStreams = async () => {
        loading = true;
        cache.streams = await getFollows(cache.user.id);
        data.set({
            user: cache.user,
            streams: await getFollows(cache.user.id),
            age: new Date().getTime()
        });
        save(cache);
        filteredStreams = cache.streams;
        loading = false;
    }

</script>

<main class="w-[450px] h-[600px] bg-background overflow-hidden flex flex-col border-none">
    <Navbar on:inputchange={res => filterStreams(res)} on:refresh={refreshStreams} validAccessToken={validAccessToken}/>

    <div class="overflow-y-scroll flex-1">
        {#if !loading && validAccessToken}
            {#each filteredStreams as stream}
                <Stream stream={stream}/>
            {/each}
        {:else if loading && validAccessToken}
            <h1 class="text-center font-roboto text-xl font-bold mt-10 text-lighttext">Loading...</h1>
        {:else}
            <h1 class="text-center font-roboto text-xl font-bold mt-10 text-lighttext">Login first</h1>
        {/if}
    </div>
</main>