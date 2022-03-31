//import axios from "axios"

import axios from "axios"
import { CONSTANTS } from "./constants.js";



const getAccessToken = async () => new Promise((resolve, reject) => chrome.storage.local.get(["access_token"], res => resolve(res.access_token)));

const getHeaders = async () => {
    return {
        "Authorization": "Bearer " + await getAccessToken(),
        "Client-Id": CONSTANTS.CLIENTID
    }
}

const getUsername = async () => {
    return new Promise(async (resolve, reject) => {
        axios.get("https://api.twitch.tv/helix/users", {
            headers: await getHeaders()
        }).then(res => {
            resolve(res.data.data[0]);
        })
    })
}

const getFollows = async (userID) => {
    return new Promise(async (resolve, reject) => {
        axios.get("https://api.twitch.tv/helix/streams/followed?user_id=" + userID, {
            headers: await getHeaders()
        }).then(res => {
            resolve(res.data.data);
        })
    })
}


export { getUsername, getFollows }