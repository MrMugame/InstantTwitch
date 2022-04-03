<script>
    import { createEventDispatcher } from "svelte";


    const dispatch = createEventDispatcher();
</script>


<div class="flex flex-col p-2">
    <div class="flex justify-between">
        <svg on:click={_ => dispatch('pagechange', {page: "streams"})} xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover: stroke-lighttext hover:stroke-strongtext" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <h2 class="font-roboto text-strongtext font-semibold text-[15px] mx-6">Settings</h2>
    </div>
</div>