import { sendNotification, setBadgeText } from "../helpers/helpers";
import { get } from "svelte/store";
import { request } from "../helpers/request";
import { stores } from "../stores/stores";


export const fetchCurrentUser = async () => {
    return (await request("users")).data[0];
}

export const fetchFollowedStreams = async (user) => {
    return (await request("streams/followed", {"user_id": user.id})).data;
}

export const fetchFollowedUsers = async (user, cursor = "") => {
    const {data: follows, pagination} = await request("channels/followed", {"user_id": user.id, "first": 100, "after": cursor});

    const ids = follows.map(x => x.broadcaster_id);
    const {data: users} = await request("users", {id: ids})

    if (pagination.cursor) {
        users.push(...(await fetchFollowedUsers(user, pagination.cursor)));
    }

    return users
}

export const refreshCurrentUser = async (tokenAvailable) => {
    let currentUser = null;

    if (tokenAvailable) {
        currentUser = await fetchCurrentUser();
    }

    stores.currentUser.set(currentUser);

    return currentUser
}

export const refreshFollowedStreams = async (user, notification) => {
    await stores.settings.load();

    let streams = await fetchFollowedStreams(user);

    
    if (notification && get(stores.settings).notifications) {
        await stores.followedStreams.load();
        
        let oldStreams = get(stores.followedStreams) || [];

        let result = streams.filter(newVal => !oldStreams.some(oldVal => oldVal.id === newVal.id));

        result = result.map(x => x.user_name);
        let msg = result.join(", ");

        if (msg != "") {
            msg = msg.replace(/,(?!.*,)/, " and");
            sendNotification(msg + " " + (result.length > 1 ? "are" : "is") + " now live!")
        }

    }
    setBadgeText(streams.length)

    stores.followedStreams.set(streams);
    
    return streams
}

export const refreshFollowedUsers = async (user) => {
    let users = await fetchFollowedUsers(user);

    stores.followedUsers.set(users);

    return users
}
