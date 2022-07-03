import { request } from "./request";

export const fetchTopGames = async (amount = 20, cursor = "") => {
    return (await request("games/top", {"first": amount, "after": cursor}));
}

export const fetchTopStreams = async (amount = 20, cursor = "") => {
    return (await request("streams", {"first": amount, "after": cursor}));
}

export const fetchQueryGames = async (query = "", cursor = "") => {
    return (await request("search/categories", {"query": query, "after": cursor}));
}

export const fetchQueryStreams = async (query = "", cursor = "") => {
    return (await request("search/channels", {"query": query, "after": cursor}));
}