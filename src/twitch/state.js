import { checkAccessToken, getFollows, getUser } from './api';
import { data, isValid, load, save } from './cache';
import { page } from './page';
import { updateBadgeText } from './updates';

let cache;
data.subscribe(val => cache = val);

const logout = () => {
    chrome.storage.local.clear();
    data.set({});
    page.set("streams");

    return loadData();
}

const refreshStreams = async () => {
    data.set({
        user: cache.user,
        streams: await getFollows(cache.user.id),
        age: new Date().getTime()
    });
    updateBadgeText(cache.streams.length);
    save(cache);
}

const loadData = async () => {
    let response = await load();
    data.set(response);
    
    if (!isValid(cache, 10)) { // 10 min lifetime
        console.log("fetching");
        
        let validToken = await checkAccessToken();
        
        if (validToken?.expires_in > 0) {
            let user = await getUser();
            
            data.set({
                age: new Date().getTime(),
                user: user,
                streams: await getFollows(user.id)
            });
            updateBadgeText(cache.streams.length);
            save(cache);
        } else {
            throw new Error();
        }
    }
}

export { logout, refreshStreams, loadData }