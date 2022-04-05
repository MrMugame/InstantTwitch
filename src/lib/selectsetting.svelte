<script>
    import { createEventDispatcher } from "svelte";

    export let selected;
    export let options;
    export let name;

    let dispatch = createEventDispatcher();
</script>



<div class="flex items-center my-2">
    <h3 class="text-base font-roboto text-strongtext font-semibold">{name}</h3>
    <select on:change={res => dispatch("change", {})} bind:value={selected} class="bg-twitch text-lighttext mx-5 rounded-md h-5">
        {#each options as option}
            <option class="text-sm" value={option}>
                {option}min
            </option>
        {/each}
    </select>
</div>