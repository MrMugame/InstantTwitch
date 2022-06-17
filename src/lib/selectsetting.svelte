<script>
    export let selected;
    export let options;
    export let name;
</script>



<div class="flex items-center my-2 justify-between">
    <h3 class="text-base font-roboto dark:text-lighttext text-lightlighttext font-semibold">{name}</h3>
    <select bind:value={selected} class="bg-twitch text-stromgtext rounded-full h-6 text-base font-medium pl-1 pr-3 text-ellipsis w-[95px] ">
        {#each Object.entries(options) as [title, value]}
            <option value={value}>{title}</option>
        {/each}
    </select>
</div>