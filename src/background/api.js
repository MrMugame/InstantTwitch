import { request } from "./request";
import { stores } from "../stores/stores";


export const fetchCurrentUser = async () => {
    return (await request("users")).data[0];
}

export const fetchFollowedStreams = async (user) => {
    return (await request("streams/followed", {"user_id": user.id})).data;
}

export const fetchFollowedUsers = async (user, cursor = "") => {
    const {data: follows, pagination} = await request("users/follows", {"from_id": user.id, "first": 100, "after": cursor});
    
    const ids = follows.map(x => x.to_id);
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

export const refreshFollowedStreams = async (user, sendNotification) => {
    let streams = await fetchFollowedStreams(user);

    // notificatioms
    stores.followedStreams.set(streams);

    return streams
}

export const refreshFollowedUsers = async (user) => {
    let users = await fetchFollowedUsers(user);

    stores.followedUsers.set(users);

    return users
}