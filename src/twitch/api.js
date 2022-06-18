//import axios from "axios"

const CONSTANTS = {
    CLIENTID: "i8uqx7hag4dcu1ipxqeggxyn1ys3om"
}

const getAccessToken = async () => {
    return new Promise(resolve => {
        chrome.storage.local.get(["access_token"], res => resolve(res.access_token))
    });
}

const getHeaders = async () => {
    return {
        "Authorization": "Bearer " + await getAccessToken(),
        "Client-Id": CONSTANTS.CLIENTID
    }
}

export const getUser = async () => {
    let response = await fetch("https://api.twitch.tv/helix/users", {
            headers: await getHeaders()
    });
    let data = await response.json();
    return data.data[0]
}

export const getFollows = async (userID) => {
    let response = await fetch("https://api.twitch.tv/helix/streams/followed?user_id=" + userID, {
            headers: await getHeaders()
    });
    let data = await response.json();
    return data.data
}

export const getTopGames = async (amount = 20, cursor = "") => {
    let response = await fetch("https://api.twitch.tv/helix/games/top?first=" + amount + "&after=" + cursor, {
            headers: await getHeaders()
    });
    let data = await response.json();
    return data
}

export const getTopStreams = async (amount = 20, cursor = "") => {
    let response = await fetch("https://api.twitch.tv/helix/streams?first=" + amount + "&after=" + cursor, {
        headers: await getHeaders()
    });
    let data = await response.json();
    return data
}

export const getQueryGames = async (query = "", cursor = "") => {
    let response = await fetch("https://api.twitch.tv/helix/search/categories?query=" + query + "&after=" + cursor, {
        headers: await getHeaders()
    });
    let data = await response.json();
    return data
}


export const getQueryStreams = async (query = "", cursor = "") => {
    let response = await fetch("https://api.twitch.tv/helix/search/channels?query=" + query + "&after=" + cursor, {
        headers: await getHeaders()
    });
    let data = await response.json();
    return data
}

export const getAllFollows = async (userID, amount = 20, cursor = "") => {
    let response = await fetch(`https://api.twitch.tv/helix/users/follows?from_id=${userID}&first=${amount}&after=${cursor}`, {
        headers: await getHeaders()
    });
    let data = await response.json();
    return data
}

export const getUsers = async (ids) => {
    let querys = ids.join("&id=");
    querys = querys.slice(1);

    let response = await fetch("https://api.twitch.tv/helix/users?" + querys, {
        headers: await getHeaders()
    });
    let data = await response.json();
    return data.data
}

export const checkAccessToken = async () => {
    return new Promise(async (resolve, reject) => {
        fetch("https://id.twitch.tv/oauth2/validate", {
            headers: {
                "Authorization": "Bearer " + await getAccessToken()
            }
        })
        .then(async response => resolve(await response.json()))
        .catch(err => reject(err))
    })
}

