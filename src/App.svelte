<script>
import { getUsername, getFollows } from "./twitch/api";


    let user = {};

    let streams = [];

    const wrapper = async () => {
        user = await getUsername();
        streams = await getFollows(user.id);
    }
</script>

<main>
    <h1>InstantTwitch</h1>
    <button on:click={() => {chrome.runtime.sendMessage({ data: "OAUTH" })}}>
        test
    </button>

    <button on:click={wrapper}>
        fetcheverything
    </button>

    <h2>{user.display_name}</h2>
    <img src={user.profile_image_url} alt="profile picture">

    <div>
        {#each streams as stream}
            <h3>{stream.user_name}</h3>
        {/each}
    </div>
</main>

<style>

</style>
