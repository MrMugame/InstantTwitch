<script>
    import Navbar from "./lib/navbar.svelte";
    import Stream from "./lib/stream.svelte";
    import { getUser, getFollows, checkAccessToken } from "./twitch/api";

    let user = {};
    let streams = [];
    let filteredStreams = [];

    let validAccessToken = false;

    let laoding = true;

    checkAccessToken().then(async (res) => {
        validAccessToken = (res?.status == 200 && res?.data?.expires_in > 0);
        if (validAccessToken) {
            user = await getUser();
            streams = await getFollows(user.id);
            filteredStreams = streams;
            laoding = false;
        }
    })

    const filterStreams = async (res) => {
        const searchTerm = res.detail.value.toLowerCase();
        filteredStreams = streams.filter(stream => {
            return stream.user_name.toLowerCase().includes(searchTerm)
        })
    }

    const refreshStreams = async () => {
        laoding = true;
        streams = await getFollows(user.id);
        console.log(streams);
        filteredStreams = streams;
        laoding = false;
    }

</script>

<main class="w-[450px] h-[600px] bg-background overflow-hidden flex flex-col">
    <Navbar on:inputchange={res => filterStreams(res)} on:refresh={refreshStreams} user={user} validAccessToken={validAccessToken}/>

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