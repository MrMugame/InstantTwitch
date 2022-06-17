<script>
    import { getTopStreams } from "../twitch/api";
    import { onMount } from "svelte";

    onMount(async () => {
        console.log(await getTopStreams());
    });
</script>

<div>
    
</div>