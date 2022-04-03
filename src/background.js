import { load } from "./twitch/cache.js"

const CLIENTID = "i8uqx7hag4dcu1ipxqeggxyn1ys3om";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.data != "OAUTH") { return }

    chrome.tabs.create({ url: makeURL() }, tab => {
        chrome.tabs.onUpdated.addListener((tabId, info) => {
            if (info.status === 'complete' && tabId === tab.id) {
                chrome.tabs.query({active: true, currentWindow: true}, ([newtab]) => {
                    let url = new URL(newtab.url);
                    let parameters = new URLSearchParams(url.hash);

                    if (parameters.get("#access_token") != null) {
                        chrome.storage.local.set({access_token: parameters.get("#access_token")});
                        chrome.tabs.remove(newtab.id);
                    }
                })
            }
        });
    });
})

const makeURL = () => {
    let url = new URL("https://id.twitch.tv/oauth2/authorize");

    url.searchParams.append("client_id", CLIENTID);
    url.searchParams.append("redirect_uri", "https://ndragomirov.github.io/twitch.html");
    url.searchParams.append("response_type", "token");
    url.searchParams.append("scope", "user:read:follows");

    return url.href
}


