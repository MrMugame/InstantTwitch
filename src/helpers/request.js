import { stores } from "../stores/stores";
import { get } from "svelte/store";

const CLIENTID = "i8uqx7hag4dcu1ipxqeggxyn1ys3om";


export const request = async (url, params = {}) => {
    const formatedUrl = new URL("https://api.twitch.tv/helix/" + url);
    
    for (let [key, value] of Object.entries(params)) {
        if(Array.isArray(value)) {
            for (let i of value) {
                formatedUrl.searchParams.append(key, i);
            }
        } else {
            formatedUrl.searchParams.append(key, value);
        }
    }

    const response = await fetch(formatedUrl, {
            headers: {
                "Authorization": "Bearer " + get(stores.accessToken),
                "Client-Id": CLIENTID
            }
    });

    return await response.json();
}