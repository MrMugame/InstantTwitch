export const SORTING = {
    SMALLTOLARGE: "SMALLTOLARGE",
    LARGETOSMALL: "LARGETOSMALL",
    ALPHABETICALLY: "ALPHABETICALLY",
    REVERSEALPHABETICALLY: "REVERSEALPHABETICALLY",
}

const defaultSettings = {
    dataLifeTime: 10,
    fetchCycle: 2.5,
    notifications: true,
    darkmode: true,
    sortingOption: SORTING.LARGETOSMALL,
    valid: false
}

export const loadSettings = async () => {
    return new Promise((resolve) => chrome.storage.local.get(["settings"], res => {
        if (res.settings?.valid == true) {
            resolve({...defaultSettings, ...res.settings});
        } else {
            resolve(defaultSettings);
        }
    }))
}

export const saveSettings = (data) => {
    let result = {
        ...data,
        valid: true
    }

    chrome.storage.local.set({settings: result});
 
    chrome.alarms.clear("update", () => {
        chrome.alarms.create("update", { periodInMinutes: result.fetchCycle});
    });
}
