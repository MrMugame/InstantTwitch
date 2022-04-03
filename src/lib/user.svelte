<script>
    export let user;
</script>

<div class="flex items-center">
    <h2 class="mx-2 font-roboto text-strongtext font-semibold text-[15px]">{user.display_name}</h2>
    <img class="w-6 h-6 rounded-full" src={user.profile_image_url} alt="profile pic">
</div>