// export const getTopGames = async (amount = 20, cursor = "") => {
//     let response = await fetch("https://api.twitch.tv/helix/games/top?first=" + amount + "&after=" + cursor, {
//             headers: await getHeaders()
//     });
//     let data = await response.json();
//     return data
// }

// export const getTopStreams = async (amount = 20, cursor = "") => {
//     let response = await fetch("https://api.twitch.tv/helix/streams?first=" + amount + "&after=" + cursor, {
//         headers: await getHeaders()
//     });
//     let data = await response.json();
//     return data
// }

// export const getQueryGames = async (query = "", cursor = "") => {
//     let response = await fetch("https://api.twitch.tv/helix/search/categories?query=" + query + "&after=" + cursor, {
//         headers: await getHeaders()
//     });
//     let data = await response.json();
//     return data
// }


// export const getQueryStreams = async (query = "", cursor = "") => {
//     let response = await fetch("https://api.twitch.tv/helix/search/channels?query=" + query + "&after=" + cursor, {
//         headers: await getHeaders()
//     });
//     let data = await response.json();
//     return data
// }

