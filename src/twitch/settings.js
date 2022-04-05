const defaultSettings = {
    dataLifeTime: 10,
    fetchCycle: 2.5,
    notifications: true,
    valid: false
}


export const loadSettings = async () => {
    return new Promise((resolve, reject) => chrome.storage.local.get(["settings"], res => {
        if (res.settings.valid == true) {
            resolve(res.settings);
        } else {
            resolve(defaultSettings);
        }
    }))
}

export const saveSettings = (data) => {
    //if (data.valid == false) { return }

    let result = {
        ...data,
        valid: true
    }

    console.log("save", result)

    chrome.storage.local.set({settings: result});
 
    chrome.alarms.clear("update", () => {
        chrome.alarms.create("update", { periodInMinutes: result.fetchCycle});
    })
}