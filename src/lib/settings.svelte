<script>
    import { createEventDispatcher } from "svelte";
import Selectsetting from "./selectsetting.svelte";

    const dispatch = createEventDispatcher();
    
    let selected;

    let intervalOptions = [
        1,
        2.5,
        5,
        10,
        15,
        30,
    ]

    const exit = () => {
        dispatch('pagechange', {page: "streams"});
    }

</script>


<div class="flex flex-col p-2">
    <div class="flex justify-between mb-5">
        <svg on:click={exit} xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover: stroke-lighttext hover:stroke-strongtext" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <h2 class="font-roboto text-lighttext font-semibold text-base mx-6">Settings</h2>
    </div>

    <Selectsetting name="Update interval:" options={intervalOptions} bind:selected={selected}/>

    <Selectsetting name="Data lifetime:" options={intervalOptions} bind:selected={selected}/>
</div>