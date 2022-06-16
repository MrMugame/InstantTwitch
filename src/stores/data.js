import { checkAccessToken, getFollows, getUser } from "../twitch/api";
import { loadCache, saveCache, clearCache } from "../twitch/cache";
import { loadSettings } from "../twitch/settings";
import { updateBadgeText } from "../twitch/updates";

export const loadUser = async () => {
    const response = await loadCache("user");

    if (response == null) {
        let validToken = await checkAccessToken();
        
        if (validToken?.expires_in > 0) {
            let user = await getUser();

            saveCache(user);

            return user
        } else {
            throw new Error();
        }
    } else {
        return response
    }
}

const isValid = async (data) => {
    if (data?.age == undefined || data?.streams == undefined) {
        return false
    }
    const settings = await loadSettings();

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

export const refreshStreams = async () => {
    let user = await loadUser();
        
    if (user != undefined) {
        let streams = await getFollows(user.id);
        
        updateBadgeText(streams.length);

        let data = {
            age: new Date().getTime(),
            streams: streams
        }

        saveCache(data);

        return data
    } else {
        throw new Error();
    }
}

export const logout = () => {
    clearCache();
    window.close();
}