import { getFollows } from "./twitch/api.js";
import { isValid, load, save } from "./twitch/cache.js"
import { loadSettings } from "./twitch/settings.js";
import { sendNotification, updateBadgeText } from "./twitch/updates.js";

const CLIENTID = "i8uqx7hag4dcu1ipxqeggxyn1ys3om";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.data != "OAUTH") { return }

    return new Promise(resolve => {
        chrome.tabs.create({ url: makeURL() }, tab => {
            chrome.tabs.onUpdated.addListener((tabId, info) => {
                if (info.status === 'complete' && tabId === tab.id) {
                    chrome.tabs.query({active: true, currentWindow: true}, ([newtab]) => {
                        let url = new URL(newtab.url);
                        let parameters = new URLSearchParams(url.hash);
    
                        if (parameters.get("#access_token") != null) {
                            chrome.storage.local.set({access_token: parameters.get("#access_token")});
                            chrome.tabs.remove(newtab.id);
                            resolve();
                        }
                    })
                }
            });
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
    // chrome.alarms.create("update", { periodInMinutes: res.fetchCycle });
    chrome.alarms.create("update", { periodInMinutes: 0.2 });
})


chrome.alarms.onAlarm.addListener(async alarm => {
    if (alarm.name !== "update") { return }

    const oldData = await load();

    if (!isValid(oldData, 60 * 10)) { return }

    const newData = await getFollows(oldData.user.id);

    updateBadgeText(newData.length || "");
    
    let settings = await loadSettings();
    if (settings.notifications == false) { return }
    
    let cache = await new Promise(resolve => chrome.storage.local.get(["notification_cache"], res => {
        resolve(res.notification_cache || []);
    }));

    // Filter all the streams that ended, but dont add new streams
    cache = cache.filter(e1 => {
        return newData.some(e2 => e1 === e2.id);
    });

    // Filter all new streams and put in result
    let result = newData.filter(e1 => {
        return !cache.includes(e1.id);
    });

    let notification_string = "";
    for (let stream of result) {
        if (stream.user_name != "") {
            cache.push(stream.id);
            notification_string += stream.user_name + ", "
        }
    }

    if (result.length > 0) {
        notification_string = notification_string.substring(0, notification_string.lastIndexOf(","));

        notification_string = notification_string.replace(/,(?!.*,)/, " and")

        sendNotification(notification_string + " " + (result.length > 1 ? "are" : "is") + " now live!");
    }

    chrome.storage.local.set({notification_cache: cache});
})