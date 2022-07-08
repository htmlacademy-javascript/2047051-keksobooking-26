import {
  deactivatePage,
  activatePage,} from './form.js';

import {createPopupsInDom} from './create-dom-elements.js';

import {displayOffersLoadErrorMessage} from './utils.js';

import {getData} from './api.js';

deactivatePage();

const DEFAULT_LAT = 35.67844;
const DEFAULT_LNG = 139.77376;
const resetButtonElement = document.querySelector('.ad-form__reset');
const addressElement = document.querySelector('#address');


const mainIcon = L.icon(
  {
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26,52],
  }
);

const commonIcon = L.icon(
  {
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20,40],
  }
);

const map = L.map('map-canvas').on('load', activatePage).setView({
  lat: DEFAULT_LAT,
  lng: DEFAULT_LNG,
}, 12);

const mainLayer = L.layerGroup().addTo(map);

const createCommonMarker = (parentElement, offer, index) => {
  const {lat, lng} = offer.location;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon: commonIcon,
    }
  );
  marker
    .addTo(mainLayer)
    .bindPopup(parentElement.children[index]);
};

const closePopups = () => {
  map.closePopup();
};

const dataFromServer = getData('https://26.javascript.pages.academy/keksobooking/data', createPopupsInDom, createCommonMarker, displayOffersLoadErrorMessage);

map.on('load', dataFromServer);

const mapTiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

mapTiles.addTo(mainLayer);

const mainMarker = L.marker(
  {
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  },
  {
    draggable: true,
    icon: mainIcon,
  }
);

mainMarker.addTo(mainLayer);

mainMarker.on('moveend', (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  addressElement.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
});

const setMapDefaultPosition = () => {
  map.setView({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  }, 12);
  mainMarker.setLatLng({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  });
};

resetButtonElement.addEventListener('click', setMapDefaultPosition);

export {
  createCommonMarker,
  closePopups,
  setMapDefaultPosition,
};
