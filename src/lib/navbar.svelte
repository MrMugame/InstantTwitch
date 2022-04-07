<script>
    import { refreshStreams, logout } from "/twitch/state.js";
    import { data } from '/twitch/cache.js';
    import User from './user.svelte';
    
    export let filteredStreams;
    export let promise;

    let input;

    const filterStreams = async (res) => {
        const searchTerm = input.toLowerCase();
        filteredStreams = $data.streams.filter(stream => {
            return stream.user_name.toLowerCase().includes(searchTerm)
        });
    }
</script>


<main>
    <div class="flex justify-between w-full border-b-[1px] border-lightborder dark:bg-foreground bg-lightforeground relative">
        <div class="flex flex-row p-1">
            <input bind:value={input} on:input={res => filterStreams(res)} type="text" placeholder="Search" class="dark:bg-background bg-lightbackground h-6 rounded-md pl-2 dark:text-strongtext text-lightstrongtext mr-2">
            <svg on:click={_ => promise = refreshStreams()} xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 fill-lighttext hover:fill-strongtext transition-colors" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
            </svg>
        </div>
        {#await promise then}
            <User on:logout={_ => promise = logout()}/>
        {:catch}
            <button class="bg-twitch rounded-md px-3 border-[1px] border-lightborder dark:text-strongtext text-lightstrongtext font-semibold m-1" on:click={_ => {chrome.runtime.sendMessage({ data: "OAUTH" })}}>
                Login
            </button>
        {/await}
    </div>
</main>