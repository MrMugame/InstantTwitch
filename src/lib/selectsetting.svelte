<script>
    export let selected;
    export let options;
    export let name;
</script>



<div class="flex items-center my-2 justify-between">
    <h3 class="text-base font-roboto dark:text-lighttext text-lightlighttext font-semibold">{name}</h3>
    <select bind:value={selected} class="bg-twitch text-stromgtext rounded-md h-6 text-sm text-ellipsis w-[85px]">
        {#each Object.entries(options) as [title, value]}
            <option value={value}>{title}</option>
        {/each}
    </select>
</div>