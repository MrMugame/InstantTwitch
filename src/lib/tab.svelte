<script>
    import { push } from 'svelte-spa-router'

    export let name;
    export let pageLink;
</script>

<div on:click={_ => push(pageLink)} class="h-full w-full hover:bg-twitch cursor-pointer flex justify-center flex-col items-center transition-colors">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 dark:fill-lighttext fill-lightstrongtext" viewBox="0 0 20 20" fill="currentColor">
        <slot></slot>
    </svg>
    <h2 class="dark:text-lighttext text-lightstrongtext text-xs font-semibold">{name}</h2>
</div>