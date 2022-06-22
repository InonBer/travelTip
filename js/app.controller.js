import { locService } from './services/loc.service.js';
import { mapService } from './services/map.service.js';

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onRemoveCard = onRemoveCard
window.goToCardLocation = goToCardLocation

function onInit() {
    mapService
        .initMap()
        .then(() => {
            console.log('Map is ready');
        })
        .catch(() => console.log('Error: cannot init map'));
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

function onAddMarker() {
    console.log('Adding a marker');
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function goToCardLocation(lat, lng) {
    console.log(lat);
    console.log(lng);
    mapService.panTo(lat, lng);

}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            document.querySelector('.locations').innerHTML = locs.map(loc => {
                return `<div class="location-card">
                        <header class="card-header">${loc.title}</header>
                        <p>lat: ${JSON.stringify(loc.position.lat)}</p>
                        <p>lng: ${JSON.stringify(loc.position.lng)}</p>
                        <button class="card-btn" onclick="onRemoveCard(${JSON.stringify(loc.id)})">X</button>
                        <button class="card-btn" onclick="goToCardLocation(${JSON.stringify(loc.position.lat)}, ${JSON.stringify(loc.position.lng)})">Go To</button>
                        </div>
                        `
            })
        })
}

function onRemoveCard(id) {
    var locs = locService.getLocs()
        .then(locs => {
            console.log(locs);
            locs.splice(id, 1)
            locService.onReturnNewLocs(locs)

        }
        )
    onGetLocs()
}

function onGetUserPos() {
    getPosition()
        .then((pos) => {
            console.log('User position is:', pos.coords);
            document.querySelector(
                '.user-pos'
            ).innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`;
            mapService.addMarker(pos.coords);
            mapService.panTo(pos.coords.latitude, pos.coords.longitude);
        })
        .catch((err) => {
            console.log('err!!!', err);
        });
}
function onPanTo() {
    console.log('Panning the Map');
    mapService.panTo(35.6895, 139.6917);
}
