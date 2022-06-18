<script>
    export let checked;
    export let name;
</script>


<div class="flex items-center my-2 justify-between">
    <h3 class="text-base font-roboto dark:text-lighttext text-lightlighttext font-semibold">{name}</h3>
    <input class="appearance-none w-11 h-6 rounded-full dark:bg-background bg-lightbackground border-2 dark:border-strongtext border-lightstrongtext checked:border-twitch dark:checked:border-twitch focus:outline-none cursor-pointer dark:after:bg-strongtext after:bg-lightstrongtext checked:after:bg-twitch dark:checked:after:bg-twitch after:block after:relative after:w-[17px] after:h-[17px] after:rounded-full after:-translate-x-1/2 after:-translate-y-1/2 after:top-1/2 after:left-1/4 checked:after:left-3/4 after:transition-all" type="checkbox" role="switch" bind:checked={checked}>
</div>