<script>
    import { createEventDispatcher } from "svelte";

    export let selected;
    export let options;
    export let name;

    let dispatch = createEventDispatcher();
</script>



<div class="flex items-center my-2">
    <h3 class="text-base font-roboto dark:text-strongtext text-lightstrongtext font-semibold">{name}</h3>
    <select on:change={res => dispatch("change", {})} bind:value={selected} class="bg-twitch text-lighttext mx-5 rounded-md h-5 text-xs">
        {#each options as option}
            <option value={option}>
                {option}min
            </option>
        {/each}
    </select>
</div>