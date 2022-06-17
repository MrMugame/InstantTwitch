<script>
    export let selected;
    export let options;
    export let name;

    let show;
</script>



<div class="flex items-center my-2 justify-between">
    <!-- <h3 class="text-base dark:text-lighttext text-lightlighttext font-semibold">{name}</h3>
    <select bind:value={selected} class="bg-twitch text-strongtext rounded-full h-6 text-base font-medium pl-1 pr-3 text-ellipsis w-[95px] ">
        {#each Object.entries(options) as [title, value]}
            <option value={value}>{title}</option>
        {/each}
    </select> -->
    <h3 class="text-base dark:text-lighttext text-lightlighttext font-semibold">{name}</h3>
    <div class="relative">
        <button on:click={() => show = !show} class="text-strongtext bg-twitch hover:opacity-80 font-medium rounded-full text-base px-3 py-2.5 inline-flex items-center h-6 w-[95px] justify-between" type="button">
            <h3 class="text-ellipsis whitespace-nowrap overflow-hidden w-[80px] text-left">{Object.keys(options).find(key => options[key] === selected)}</h3> 
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
        </button>
        {#if show}
            <div class="z-10 bg-twitch divide-y divide-gray-100 rounded absolute whitespace-nowrap translate-y-full -bottom-1 right-0 min-w-[95px]">
                <ul class="divide-y divide-strongborder border-1 border-strongborder">
                    {#each Object.entries(options) as [title, value]}
                        <li>
                            <h3 on:click={() => {selected = value; show = false}} class="block px-2 py-1 text-strongtext text-base font-medium font-sans hover:backdrop-brightness-90 select-none">{title}</h3>
                        </li>
                    {/each}
                </ul>
            </div>
        {/if}
    </div>
</div>