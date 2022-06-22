import { utils } from './utils.js';
import { locService } from './loc.service.js';
export const mapService = {
    initMap,
    addMarker,
    panTo,
};
var gMap;

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
        });
        console.log('Map!', gMap);
    });
}

function addMarker(loc) {
    var locs = locService.getLocs().then((res) => {
        var gId = res.length;
        var marker = new google.maps.Marker({
            position: loc,
            map: gMap,
            title: prompt('txt'),
            id: gId++,
        });
        locService.makeLoc(marker);
        return marker;
    });
}

function panTo(lat, lng) {
    console.log(lat, lng);
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve();
    const API_KEY = 'AIzaSyBMAM9h9PFldbQkiUoOaRXJu5I9EH5MeMQ';
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load');
    });
}

//? API_KEY = 'AIzaSyCxgGZMqJNGhy6HHjbcV7-XkRbkEgvuOzI'
//? API_KEY = 'AIzaSyBVOa39S6zjJc0kQ4YTgXUOP4DJ3a-XzI0' ////*! mew
//? API_KEY = 'AIzaSyBVOa39S6zjJc0kQ4YTgXUOP4DJ3a-XzI0' ////*! mew
//? https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyBVOa39S6zjJc0kQ4YTgXUOP4DJ3a-XzI0
//? https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY

function getLocationByLatLng(lan, lat) {
    if (wikiCache[input]) {
        console.log('No need to fetch, retrieving from Cache');
        return Promise.resolve(wikiCache[input]);
    }
    const API_KEY = 'AIzaSyCxgGZMqJNGhy6HHjbcV7-XkRbkEgvuOzI';

    return axios
        .get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lan}&key=${API_KEY}`)
        .then((res) => res.data.query.search[0])
        .then((res) => {
            wikiCache[input] = res;
            saveToStorage(WIKI_KEY, wikiCache);
            return res;
        });
}

function getLocationBySearchTerm(SearchTerm) {
    if (wikiCache[SearchTerm]) {
        console.log('No need to fetch, retrieving from Cache');
        return Promise.resolve(wikiCache[input]);
    }
    const API_KEY = 'AIzaSyCxgGZMqJNGhy6HHjbcV7-XkRbkEgvuOzI';

    return axios
        .get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${SearchTerm}&key=${API_KEY}`
            // `https://maps.googleapis.com/maps/api/geocode/json?address=central+park&key=AIzaSyBVOa39S6zjJc0kQ4YTgXUOP4DJ3a-XzI0`
        )
        .then((res) => res.data.query.search[0])
        .then((res) => {
            wikiCache[input] = res;
            saveToStorage(WIKI_KEY, wikiCache);
            return res;
        });
}

function getWeatherByLatLng(lan, lat) {
    if (weatherCache[input]) {
        console.log('No need to fetch, retrieving from Cache');
        return Promise.resolve(weatherCache[input]);
    }
    const API_KEY = '29c904ee41c976a974e539b084bd9304';

    return axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lan}&appid=${API_KEY}`)
        .then((res) => res.data.query.search[0])
        .then((res) => {
            weatherCache[input] = res;
            saveToStorage(WIKI_KEY, weatherCache);
            return res;
        });
}
