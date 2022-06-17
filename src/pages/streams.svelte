<script>
    import { getTopStreams } from "../twitch/api";
    import { onMount } from "svelte";

    onMount(async () => {
        console.log(await getTopStreams());
    });
</script>

<h1>Test</h1>
