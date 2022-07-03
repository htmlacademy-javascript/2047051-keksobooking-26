import {
  deactivatePage,
  activatePage,} from './form.js';

const addressElement = document.querySelector('#address');
deactivatePage();

const map = L.map('map-canvas').on('load', activatePage).setView({
  lat: 35.652832,
  lng: 139.839478,
}, 10);
const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
tiles.addTo(map);

const mainIcon = L.icon(
  {
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26,52],
  }
);

const mainMarker = L.marker(
  {
    lat: 35.67844,
    lng: 139.77376,
  },
  {
    draggable: true,
    icon: mainIcon,
  }

);
mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  addressElement.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
});

