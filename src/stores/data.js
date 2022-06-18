import { get } from "svelte/store";
import { checkAccessToken, getAllFollows, getFollows, getUser, getUsers } from "../twitch/api";
import { loadCache, saveCache, clearCache } from "../twitch/cache";
import { settings as settingsStore } from "../twitch/settings";
import { updateBadgeText } from "../twitch/updates";

export const loadUser = async () => {
    const response = await loadCache("user");

    if (response == null) {
        let validToken = await checkAccessToken();
        
        if (validToken?.expires_in > 0) {
            let user = await getUser();

            saveCache("user", user);

            return user
        } else {
            throw new Error();
        }
    } else {
        return response
    }
}

const isValid = async (data) => {
    if (data?.age == undefined || !(data?.streams == undefined || data?.follows == undefined)) {
        return false
    }
    const settings = get(settingsStore);

    const time_diff = new Date().getTime() - data.age;
    return time_diff < (settings.dataLifeTime * 60 * 1000)
}

export const loadStreams = async () => {
    const response = await loadCache("streams");

    if (!await isValid(response)) {
        let user = await loadUser();
        
        if (user != undefined) {
            let streams = await getFollows(user.id);
            
            updateBadgeText(streams.length);

            saveCache("streams", {
                age: new Date().getTime(),
                streams: streams
            });

            return streams
        } else {
            throw new Error();
        }
    } else {
        return response.streams
    }
}

export const loadFollows = async () => {
    const response = await loadCache("follows");

    if (!await isValid(response)) {
        let user = await loadUser();
        
        if (user != undefined) {
            let total = 100;
            let cursor = "";
            let follows = [];

            for (let i = 0; i < total; i += 100) {
                let res = await getAllFollows(user.id, 100, cursor);
                let ids = res.data.map((e) => e.to_id);
                let users = await getUsers(ids);

                follows = [...follows, ...users];
                cursor = res.pagination.cursor;
                total = res.total;
            }

            saveCache("follows", {
                age: new Date().getTime(),
                follows: follows
            });

            return follows
        } else {
            throw new Error();
        }
    } else {
        return response.follows
    }
}

export const refreshStreams = async () => {
    let user = await loadUser();

    if (user != undefined) {
        let streams = await getFollows(user.id);
        
        updateBadgeText(streams.length);

        saveCache("streams", {
            age: new Date().getTime(),
            streams: streams
        });

        return streams
    } else {
        throw new Error();
    }
}

export const logout = () => {
    clearCache();
    window.close();
}