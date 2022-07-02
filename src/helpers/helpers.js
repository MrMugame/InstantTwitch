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