<script>
    import { createEventDispatcher } from 'svelte';
    
    export let user, validAccessToken;
    
	const dispatch = createEventDispatcher();

    let value = null;

    $: {
        dispatch('inputchange', {value: value})
    }
</script>


<main>
    <div class="flex justify-between p-1 w-full border-b-[1px] border-lightborder bg-foreground">
        <div class="flex flex-row">
            <input bind:value={value} type="text" placeholder="Search" class="bg-background h-6 rounded-md pl-2 text-strongtext mr-2">
            <svg on:click={_ => dispatch('refresh', {})} xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 fill-lighttext hover:fill-strongtext transition-colors" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
            </svg>
        </div>
        {#if validAccessToken}
            <div class="flex items-center">
                <h2 class="mx-2 font-roboto text-strongtext font-semibold text-[15px]">{user.display_name}</h2>
                <img class="w-6 h-6 rounded-full" src={user.profile_image_url} alt="profile pic">
            </div>
        {:else}
        <button class="bg-twitch rounded-md px-3 border-[1px] border-lightborder text-strongtext font-semibold" on:click={() => {chrome.runtime.sendMessage({ data: "OAUTH" })}}>
            Login
        </button>
        {/if}
    </div>
</main>