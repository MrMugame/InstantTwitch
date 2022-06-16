<script>
    import { location, push } from 'svelte-spa-router'

    export let name;
    export let pageLink;

    let color = $location == pageLink;
    $: color = $location == pageLink;
</script>

<div on:click={_ => push(pageLink)} class="h-full w-full hover:bg-twitch cursor-pointer flex justify-center flex-col items-center transition-colors ">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 {!color ? "dark:text-lighttext text-lightstrongtext" : "text-twitch pog"}" viewBox="0 0 20 20" fill="currentColor">
        <slot></slot>
    </svg>
    <h2 class="{!color ? "dark:text-lighttext text-lightstrongtext" : "text-twitch pog"} text-xs font-semibold">{name}</h2>
</div>

<style>
    div:hover .pog {
        @apply text-lighttext;
    }
</style>
