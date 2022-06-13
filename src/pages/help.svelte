<script>
    const manifestData = chrome.runtime.getManifest();
    console.log(manifestData.version);
</script>

<div>
    <h2>{manifestData.version}</h2>
</div>