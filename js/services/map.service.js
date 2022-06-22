


export const mapService = {
    initMap,
    addMarker,
    panTo
}
import { locService } from './loc.service.js'
var gId = 0
var gMap;
// gMap.addListener(gMap, "click", function (event) {
//     var place = addMarker(event.latLng, map);
//     console.log(place);
// });

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            gMap.addListener('click', function (event) {
                addMarker(event.latLng)
                console.log(event);
                // var input = document.getElementById("pac-input");
                // var searchBox = new google.maps.places.SearchBox(input);
                // gMap.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
                // // Bias the SearchBox results towards current map's viewport.
                // gMap.addListener("bounds_changed", function () {
                //     searchBox.setBounds(gMap.getBounds());


                // });
            })
            console.log('Map!', gMap);
        })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: prompt('txt'),
        id: gId++
    });
    locService.makeLoc(marker)
    // locService.getLocs().then((locs) => {
    //     var key = locService.getStorageKey()
    //     locs[marker.id] = marker
    //     locService.saveToStorage(key, locs)
    // })
    return marker;
}

function panTo(lat, lng) {
    console.log(lat, lng);
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}



function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyBMAM9h9PFldbQkiUoOaRXJu5I9EH5MeMQ'; //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}