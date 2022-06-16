<script>
    import { createEventDispatcher } from "svelte";
    
    let dispatch = createEventDispatcher();
    export let name;
</script>


<div class="flex items-center my-2 justify-between">
    <h3 class="text-base font-roboto dark:text-lighttext text-lightlighttext font-semibold">{name}</h3>
    <button class="bg-twitch rounded-md text-strongtext font-normal text-sm w-[85px] h-6 hover:opacity-80 cursor-pointer text-center" on:click={() => dispatch("click")}>Logout</button>
</div>