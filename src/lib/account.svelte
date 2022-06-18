<script>
    export let user;
</script>

<div class="flex items-center h-full">
    <h2 class="mx-2 font-roboto dark:text-strongtext text-lightstrongtext font-semibold text-base">{user?.display_name}</h2>
    <img class="aspect-square h-7 rounded-full" src={user?.profile_image_url} alt="profile pic">
</div>