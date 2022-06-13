<script>
    import { push } from 'svelte-spa-router'
    import { promise } from "../stores/promise"
    import { data } from "../stores/cache";
</script>

<div class="outside py-1 mr-2">
    <div class="flex items-center h-full">
        <h2 class="mx-2 font-roboto dark:text-strongtext text-lightstrongtext font-semibold text-[15px]">{$data?.user?.display_name}</h2>
        <img class="w-6 h-6 rounded-full" src={$data?.user?.profile_image_url} alt="profile pic">
    </div>
</div>