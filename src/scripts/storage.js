var chromeStorage;
try {
    chromeStorage = chrome.storage.sync;
} catch (e) {}

const Storage = {
    set: function (key, value) {
        Storage.state[key] = value;
        if (chromeStorage) {
            chromeStorage.set({ state: JSON.stringify(Storage.state) });
        }
    },
    state: {},
};

if (chromeStorage) {
    chromeStorage.get("state", function (items) {
        if (items.state) {
            try {
                Storage.state = JSON.parse(items.state);
            } catch (e) {
                console.log("failed to parse saved data.");
            }
        }
    });
} else {
    Storage.state = localStorage;
}

export default Storage;
