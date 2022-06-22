export const locService = {
    getLocs,
    getStorageKey,
    saveToStorage,
    loadFromStorage,
    makeLoc,
    onReturnNewLocs
}

const STORAGE_KEY = 'locsDB'

// const locs = [
//     { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
//     { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
// ]

var locs = loadFromStorage(STORAGE_KEY) || []

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 500)
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
function onReturnNewLocs(newLocs) {
    console.log(newLocs);
    // newLocs.then(newLoc => {
    locs = newLocs
    localStorage.clear()
    saveToStorage(STORAGE_KEY, locs)
    // })
}

function makeLoc({ title, id, position }) {
    locs[id] = {
        title,
        id,
        position,
        createdAt: new Date()
    }
    saveToStorage(STORAGE_KEY, locs)
}