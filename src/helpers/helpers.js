export const sendMessage = async (name, ...args) => {
    await chrome.runtime.sendMessage({name: name, args: args});
}

export const createTab = (url) => {
    chrome.tabs.create({ url: url });
}

export const getManifest = () => {
    return chrome.runtime.getManifest()
}

export const logout = async () => {
    await chrome.storage.local.clear();
    window.close();
}

export const setBadgeText = (number) => {
    if (typeof chrome !== "undefined") {
        if (typeof browser !== "undefined") {
            browser.browserAction.setBadgeText({text: number.toString()})
        } else {
            chrome.action.setBadgeText({text: number.toString()})
        }
    }
}

export const sendNotification = (text) => {
    chrome.notifications.create(undefined, {
        iconUrl: "../icons/icon128.png",
        title: "InstantTwitch",
        type: "basic",
        message: text
    })
}