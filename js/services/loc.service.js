export const locService = {
    getLocs,
    getStorageKey,
    saveToStorage,
    loadFromStorage,
    makeLoc
}

const STORAGE_KEY = 'locsDB'

// const locs = [
//     { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
//     { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
// ]

const locs = loadFromStorage(STORAGE_KEY) || {}

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}
function getStorageKey() {
    return STORAGE_KEY
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key);
    return JSON.parse(val);
}

function makeLoc({ title, id, position }) {

}