<script>
    import Navbar from "./lib/navbar.svelte";
    import Stream from "./lib/stream.svelte";
    import { data, isValid, load, save } from "./twitch/cache.js"
    import { getUser, getFollows, checkAccessToken } from "./twitch/api";
    
    let laoding = true;
    let validAccessToken = false;
    let filteredStreams = [];
    let cache = {};

    
    data.subscribe(val => cache = val);

    load().then(res => {
        data.set(res)

        if (!isValid(cache, 0.25)) { // 25 min data lifetime
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
                    laoding = false;
                }
            })
        } else {
            laoding = false;
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
        laoding = true;
        cache.streams = await getFollows(cache.user.id);
        data.set({
            user: cache.user,
            streams: await getFollows(cache.user.id),
            age: new Date().getTime()
        });
        save(cache);
        filteredStreams = cache.streams;
        laoding = false;
    }

</script>

<main class="w-[450px] h-[600px] bg-background overflow-hidden flex flex-col">
    <Navbar on:inputchange={res => filterStreams(res)} on:refresh={refreshStreams} validAccessToken={validAccessToken}/>

    <div class="overflow-y-scroll flex-1">
        {#if !laoding}
            {#each filteredStreams as stream}
                <Stream stream={stream}/>
            {/each}
        {:else}
            <h1 class="text-center font-roboto text-xl font-bold mt-10 text-lighttext">Loading...</h1>
        {/if}
    </div>
</main>