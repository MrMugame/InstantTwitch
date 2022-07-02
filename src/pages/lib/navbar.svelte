<script>
    import Account from './account.svelte';
    import { filter } from "../../stores/filter"
    import { reload } from "../../stores/reload"
    import { get } from 'svelte/store';
    import { stores } from '../../stores/stores';
    import { sendMessage } from '../../helpers/helpers';
 
    export let userPromise;
</script>


<div class="flex justify-between items-center w-full border-b-[1px] h-10 p-1 border-lightborder dark:bg-foreground bg-lightforeground relative">
    <div class="flex flex-row h-full items-center">
        <input bind:value={$filter} type="text" placeholder="Search" class="dark:bg-background bg-lightbackground h-full w-48 rounded-full pl-2.5 dark:text-strongtext text-lightstrongtext mr-2 text-sm">
        <svg on:click={() => $reload = true} xmlns="http://www.w3.org/2000/svg" class="h-5/6 aspect-square dark:fill-lighttext dark:hover:fill-strongtext fill-lightstrongtext hover:fill-lightlighttext transition-colors" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
        </svg>
    </div>
    {#await userPromise}
        <h1>loading</h1>
    {:then}
        <Account user={get(stores.currentUser)}/>
    {:catch}
        <button class="bg-twitch rounded-full h-7 w-20 inline-flex items-center justify-center text-strongtext font-semibold font-sans text-base m-1 hover:opacity-80" on:click={() => {sendMessage("authorize")}}>
            Login
        </button>
    {/await}
</div>