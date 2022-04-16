<script>
    export let selected;
    export let options;
    export let name;
</script>



<div class="flex items-center my-2">
    <div class="mr-5 w-[50px] flex justify-end">
        <select bind:value={selected} class="bg-twitch text-lighttext rounded-md h-5 text-xs">
            {#each options as option}
            <option value={option}>
                {option}min
            </option>
            {/each}
        </select>
    </div>
    <h3 class="text-base font-roboto dark:text-strongtext text-lightstrongtext font-semibold">{name}</h3>
</div>