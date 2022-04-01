import { writable } from 'svelte/store';

export const data = writable({});

export const isValid = (data, minutes) => {
    if (data.user == undefined || data.streams == undefined || data.age == undefined) {
        return false
    }
    const time_diff = new Date().getTime() - data.age;
    return time_diff < (minutes * 60 * 1000)
}

export const load = async () => {
    return new Promise((resolve, reject) => chrome.storage.local.get(["data_cache"], res => {
        resolve(res.data_cache);
    }))
}

export const save = (data) => {
    chrome.storage.local.set({data_cache: data});
}