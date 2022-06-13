import { get, writable } from 'svelte/store';
import { updateBadgeText } from '../twitch/updates';
import { checkAccessToken, getFollows, getUser } from '../twitch/api';
import { loadSettings } from '../twitch/settings';

const loadCache = async () => {
    return new Promise((resolve) => chrome.storage.local.get(["data_cache"], res => {
        resolve(res.data_cache || {});
    }))
}

const saveCache = (data) => {
    chrome.storage.local.set({data_cache: data});
}

const clearCache = () => {
    chrome.storage.local.clear();
}



const isValid = async (data) => {
    if (data.user == undefined || data.streams == undefined || data.age == undefined) {
        return false
    }

    let settings = await loadSettings();

    const time_diff = new Date().getTime() - data.age;
    return time_diff < (settings.dataLifeTime * 60 * 1000)
}

const loadData = async (store) => {
    
    let response = await loadCache();
    store.set(response);
    
    let data = get({subscribe: store.subscribe});

    if (!(await isValid(data))) {
        let validToken = await checkAccessToken();
        
        if (validToken?.expires_in > 0) {
            let user = await getUser();
            let streams = await getFollows(user.id);
            
            updateBadgeText(streams.length);

            store.set({
                age: new Date().getTime(),
                user: user,
                streams: streams
            });

            data = get({subscribe: store.subscribe});
            saveCache(data);
        } else {
            throw new Error();
        }
    }
}

const refreshStreams = async (store) => {
    let data = get({subscribe: store.subscribe});

    
    store.set({
        user: data.user,
        streams: await getFollows(data.user.id),
        age: new Date().getTime()
    });

    data = get({subscribe: store.subscribe});
    saveCache(data);

    updateBadgeText(data.streams.length);
}

const logout = async (store) => {
    clearCache();
    store.set({})
    loadData(store);
    window.close();
}

function createDatastore() {
	const { subscribe, set, update } = writable({});
    const store = { subscribe, set, update };

	return {
		subscribe,
        isValid: async () => {
            let data = get({subscribe});
            return await isValid(data);
        },
		loadData: async () => await loadData(store),
        refreshStreams: async () => await refreshStreams(store),
        logout: async () => await logout(store)
	};
}

export const data = createDatastore();