import { get, writable } from "svelte/store";
import { defaultSettings } from "./settings";

const createStore = (name, initValue) => {
    const { subscribe, update, set } = writable(initValue);

    return {
        name,
        subscribe,
        update,
        set,
        load: async () => {
            const value = (await chrome.storage.local.get(name))[name] || null;
            set(value);
            return value
        },
        sync: () => {
            subscribe(value => {
                if (!value) return;
                chrome.storage.local.set({[name]: value});
            });
        }
    }
}

export const initStores = async (stores) => {
    for (let val of Object.values(stores)) {
        await val.load();
    }

    if (get(stores.accessToken) == null) {
        throw new Error();
    }
}

export const subscribeStores = (stores) => {
    chrome.storage.onChanged.addListener((changes, area) => {
        if (area == "local") {
            for (let [key, { newValue }] of Object.entries(changes)) {
                stores[key].set(newValue);
            }
        }
    });
}

const createStores = () => {
    const stores = {
        currentUser: createStore("currentUser", null),
        followedStreams: createStore("followedStreams", null),
        followedUsers: createStore("followedUsers", null),
        accessToken: createStore("accessToken", null),
        settings: createStore("settings", defaultSettings)
    }

    for (let key of Object.keys(stores)) {
        stores[key].sync();
    }

    return stores
}

export const stores = createStores();