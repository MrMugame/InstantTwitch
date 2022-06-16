export const loadCache = async (cache) => {
    return new Promise((resolve) => chrome.storage.local.get([cache], res => {
        resolve(res[cache] || null);
    }))
}

export const saveCache = (cache, data) => {
    chrome.storage.local.set({[cache]: data});
}

export const clearCache = () => {
    chrome.storage.local.clear();
}