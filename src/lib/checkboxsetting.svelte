<script>
    export let checked;
    export let name;
</script>


<div class="flex items-center my-2 justify-between">
    <h3 class="text-base font-roboto dark:text-lighttext text-lightlighttext font-semibold">{name}</h3>
    <input class="appearance-none w-10 h-5 rounded-full bg-lightlighttext focus:outline-none cursor-pointer after:bg-twitch after:inline-block after:relative after:w-4 after:h-4 after:rounded-full after:-translate-x-1/2 after:-translate-y-1/2 after:top-1/2 after:left-1/3 checked:after:left-2/3 after:transition-all" type="checkbox" role="switch" bind:checked={checked}>
</div>