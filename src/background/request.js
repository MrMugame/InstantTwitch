const CLIENTID = "i8uqx7hag4dcu1ipxqeggxyn1ys3om";

const getAccessToken = async () => {
    return new Promise(resolve => {
        chrome.storage.local.get(["access_token"], res => resolve(res.access_token))
    });
}

const getHeaders = async () => {
    return {
        "Authorization": "Bearer " + await getAccessToken(),
        "Client-Id": CLIENTID
    }
}

export const request = async (url, params = {}) => {
    const formatedUrl = new URL("https://api.twitch.tv/helix/" + url);
    
    for (let [key, value] of Object.entries(params)) {
        if(Array.isArray(value)) {
            for (let i of value) {
                formatedUrl.searchParams.append(key, i);
            }
        } else {
            formatedUrl.searchParams.append(key, value);
        }
    }

    const response = await fetch(formatedUrl, {
            headers: await getHeaders()
    });

    return await response.json();
}