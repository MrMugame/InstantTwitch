
export const updateBadgeText = (number) => {
    if (typeof chrome !== "undefined") {
        if (typeof browser !== "undefined") {
            browser.browserAction.setBadgeText({text: (number).toString()})
        } else {
            chrome.action.setBadgeText({text: (number).toString()})
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