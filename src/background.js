import { getFollows } from "./twitch/api.js";
import { isValid, load, save } from "./twitch/cache.js"
import { loadSettings } from "./twitch/settings.js";
import { sendNotification, updateBadgeText } from "./twitch/updates.js";

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

loadSettings().then(res => {
    console.log(res.fetchCycle)
    chrome.alarms.create("update", { periodInMinutes: res.fetchCycle });
})


chrome.alarms.onAlarm.addListener(async alarm => {
    if (alarm.name !== "update") { return }
    
    const oldData = await load();
    if (isValid(oldData, 999999999)) { 
        const newData = await getFollows(oldData.user.id);
    
        let result = newData.filter(o1 => {
            return !oldData.streams.some(o2 => o1.user_name === o2.user_name);
        });
    
        updateBadgeText(newData.length);

        let settings = await loadSettings();
        if (settings.notifications == false) { return }

        let brokenRequest = false;
    
        for (let stream of result) {
            if (stream.user_name != "") {
                sendNotification(stream.user_name);
            } else {
                brokenRequest = true;
            }
        }

        if (!brokenRequest) {
            save({
                user: oldData.user,
                streams: newData,
                age: new Date().getTime()
            });
        }
    }
})