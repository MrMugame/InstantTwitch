<script>
    import { location, push } from 'svelte-spa-router'

    export let pageLink;

    let color = false;
    $: color = $location == pageLink;
</script>

<div on:click={() => push(pageLink)} class="h-full w-14 cursor-pointer flex justify-center flex-col items-center transition-colors group">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 stroke-2 group-hover:stroke-lightstrongtext dark:group-hover:stroke-strongtext {!color ? "dark:stroke-lighttext stroke-lightstrongtext" : "stroke-twitch"}" viewBox="0 0 24 24" fill="none">
        <slot></slot>
    </svg>
</div>