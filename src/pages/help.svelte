<script>
    const manifestData = chrome.runtime.getManifest();
</script>

<div class="flex items-center pt-10 flex-col px-8">
    <h1 class="font-sans text-xl font-bold mt-10 dark:text-strongtext text-lightstrongtext">{manifestData.name}</h1>
    <h3 class="font-sans text-sm dark:text-lighttext text-lightlighttext">{manifestData.version}</h3>
    <h2 class="font-sans text-center text-base font-normal dark:text-lighttext text-lightlighttext">{manifestData.description}</h2>
    <h2 class="font-sans text-lg font-normal text-twitch mt-4 hover:underline cursor-pointer" on:click={() => chrome.tabs.create({url: "https://github.com/MrMugame/InstantTwitch"})}>Source</h2>
</div>