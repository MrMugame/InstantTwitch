import { get, writable } from "svelte/store";

export const initStores = async (stores) => {
    for (let key of Object.keys(stores)) {
        stores[key].set((await chrome.storage.local.get(key))[key] || null);
    }

    if (get(stores.accessToken) == null) {
        throw new Error();
    }
}

const createStores = () => {
    const stores = {
        currentUser: writable(null),
        followedStreams: writable(null),
        followedUsers: writable(null),
        accessToken: writable(null),
    }

    for (let key of Object.keys(stores)) {
        stores[key].subscribe(value => {
            if (!value) return;
            chrome.storage.local.set({[key]: value});
        });
    }

    return stores
}

export const stores = createStores();