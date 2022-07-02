import { writable } from "svelte/store";

export const initStores = async (stores) => {

    for (let key of Object.keys(stores)) {
        stores[key].set((await chrome.storage.local.get(key))[key] || null);
    }
    return true;
}

const createStores = () => {
    const stores = {
        currentUser: writable(null),
        followedStreams: writable(null),
        followedUsers: writable(null),
    }

    stores.currentUser.subscribe(value => {
        if (!value) return;
        chrome.storage.local.set({currentUser: value});
    });

    stores.followedStreams.subscribe(value => {
        if (!value) return;
        chrome.storage.local.set({followedStreams: value});
    });

    stores.followedUsers.subscribe(value => {
        if (!value) return;
        chrome.storage.local.set({followedUsers: value});
    });

    return stores
}

export const stores = createStores();