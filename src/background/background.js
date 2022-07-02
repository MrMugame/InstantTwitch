import { refreshCurrentUser, refreshFollowedStreams, refreshFollowedUsers } from "./api";

const CLIENTID = "i8uqx7hag4dcu1ipxqeggxyn1ys3om";

const createURL = () => {
    let url = new URL("https://id.twitch.tv/oauth2/authorize");

    url.searchParams.append("client_id", CLIENTID);
    url.searchParams.append("redirect_uri", "https://ndragomirov.github.io/twitch.html");
    url.searchParams.append("response_type", "token");
    url.searchParams.append("scope", "user:read:follows");

    return url.href
}

chrome.runtime.onMessage.addListener((request) => {
    if (request.data != "OAUTH") { return }

    return new Promise(resolve => {
        chrome.tabs.create({ url: createURL() }, tab => {
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

const refresh = async (sendNotification = false, resetAlarm = false) => {
    if (resetAlarm) {
        chrome.alarms.clear("refresh");
    }

    const currentUser = await refreshCurrentUser(true);
    if (currentUser != null) {
        await refreshFollowedStreams(currentUser, sendNotification);
        await refreshFollowedUsers(currentUser);
    }

    if (resetAlarm) {
        chrome.alarms.create("refresh", { periodInMinutes: 1 });
    }
}

const run = () => {
    console.log("yay");
    refresh(false, true);
}

chrome.runtime.onMessage.addListener(message => {
    switch (message.name) {
        case "refresh":
            refresh(...message.args);
    }
})

chrome.runtime.onStartup.addListener(() => {
    run();
});

chrome.runtime.onInstalled.addListener(() => {
    run();
});

chrome.alarms.onAlarm.addListener(alarm => {
    refresh(true, false);
});