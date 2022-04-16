<script>
    export let checked;
    export let name;
</script>


<div class="flex items-center my-2">
    <div class="flex justify-end w-[50px] mr-5">
        <input class=" accent-twitch" type="checkbox" name="scales" bind:checked={checked}>
    </div>
    <h3 class="text-base font-roboto dark:text-strongtext text-lightstrongtext font-semibold">{name}</h3>
</div>