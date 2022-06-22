

import { utils } from './utils.js';
import { locService } from './loc.service.js'
export const mapService = {
    initMap,
    addMarker,
    panTo
}
var gMap;
const idStorage = 'idDB'
var gId = locService.loadFromStorage(idStorage) || 0
// gMap.addListener(gMap, "click", function (event) {
//     var place = addMarker(event.latLng, map);
//     console.log(place);
// });

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi().then(() => {
        console.log('google available');
        gMap = new google.maps.Map(document.querySelector('#map'), {
            center: { lat, lng },
            zoom: 15,
        });
        gMap.addListener('click', function (event) {
            addMarker(event.latLng);
            console.log(event);
            // var input = document.getElementById("pac-input");
            // var searchBox = new google.maps.places.SearchBox(input);
            // gMap.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
            // // Bias the SearchBox results towards current map's viewport.
            // gMap.addListener("bounds_changed", function () {
            //     searchBox.setBounds(gMap.getBounds());

            // });
        });
        console.log('Map!', gMap);
    });
}

function addMarker(loc, title = prompt('txt')) {


    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title,
        id: gId++
    });
    locService.makeLoc(marker)
    locService.saveToStorage(idStorage, gId)
    return marker;
}

function panTo(lat, lng) {
    console.log(lat, lng);
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve();
    const API_KEY = 'AIzaSyBMAM9h9PFldbQkiUoOaRXJu5I9EH5MeMQ'; //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load');
    });
}
