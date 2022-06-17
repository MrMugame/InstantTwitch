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
    return new Promise(async (resolve, reject) => {
        fetch("https://api.twitch.tv/helix/users", {
            headers: await getHeaders()
        })
        .then(response => response.json())
        .then(res => resolve(res.data[0]));
    })
}

export const getFollows = async (userID) => {
    return new Promise(async (resolve, reject) => {
        fetch("https://api.twitch.tv/helix/streams/followed?user_id=" + userID, {
            headers: await getHeaders()
        })
        .then(response => response.json())
        .then(res => resolve(res.data));
    });
}

export const getTopGames = async (amount = 20, cursor = "") => {
    return new Promise(async (resolve) => {
        fetch("https://api.twitch.tv/helix/games/top?first=" + amount + "&after=" + cursor, {
            headers: await getHeaders()
        })
        .then(response => response.json())
        .then(res => resolve(res));
    });
}

export const getQueryGames = async (query = "", cursor = "") => {
    return new Promise(async (resolve, reject) => {
        fetch("https://api.twitch.tv/helix/search/categories?query=" + query + "&after=" + cursor, {
            headers: await getHeaders()
        })
        .then(response => response.json())
        .then(res => resolve(res));
    });
}


export const getAllFollows = async (userID, amount = 20, cursor = "") => {
    return new Promise(async (resolve, reject) => {
        fetch(`https://api.twitch.tv/helix/users/follows?from_id=${userID}&first=${amount}&after=${cursor}`, {
            headers: await getHeaders()
        })
        .then(response => response.json())
        .then(res => resolve(res));
    });
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

