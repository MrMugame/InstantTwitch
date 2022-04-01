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


// class DataCache {

//     constructor() {
//         this.age = new Date();
//         this.data = {
//             streams: null,
//             user: null
//         }
//     }

//     async load() {
//         return new Promise((resolve, reject) => chrome.storage.local.get(["data_cache"], res => {
//             console.log(res.data_cache);
//             if (res.streams == undefined || res.user == undefined) {
//                 reject();
//             }
//             this.data = res.data_cache;
//             resolve();
//         }))
//     }

//     save() {
//         return new Promise((resolve, reject) => chrome.storage.local.set({data_cache: this.data}))
//     }

//     isValid(minutes) {
//         const now = new Date();
//         const time_diff = now.getTime() - this.age.getTime();
//         return time_diff > (minutes * 60 * 1000)
//     }

// }
