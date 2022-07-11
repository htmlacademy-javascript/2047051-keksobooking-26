import {
  deactivatePage,
  activateMap,
  activateAdForm,
  mapFiltersFormElement,
} from './form.js';

import {createPopupsInDom} from './create-dom-elements.js';

import {showOffersLoadErrorMessage} from './utils.js';

import {getData} from './api.js';

deactivatePage();

const DEFAULT_LAT = 35.68173;
const DEFAULT_LNG = 139.75393;
const DEFAULT_MAP_ZOOM = 13;
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

const map = L.map('map-canvas');

map.on('load', activateAdForm).setView({
  lat: DEFAULT_LAT,
  lng: DEFAULT_LNG,
}, DEFAULT_MAP_ZOOM);

const mainLayer = L.layerGroup().addTo(map);

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

mainMarker.addTo(map);

mainMarker.on('drag', (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  addressElement.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
});

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

const closeMapPopups = () => {
  map.closePopup();
};

const dataFromServer = getData('https://26.javascript.pages.academy/keksobooking/data', showOffersLoadErrorMessage);

dataFromServer.then((data) => {
  const offerCards = createPopupsInDom(data);
  for (let i = 0; i < 10; i++) {
    createCommonMarker(offerCards, data[i], i);
  }
}).then(() => activateMap()).catch(() => showOffersLoadErrorMessage());

map.on('load', dataFromServer);

const mapTiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

mapTiles.addTo(map);

const setMapDefaultPosition = () => {
  map.setView({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  }, DEFAULT_MAP_ZOOM);
  mainMarker.setLatLng({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  });
};

const onResetButtonClick = setMapDefaultPosition;

resetButtonElement.addEventListener('click', onResetButtonClick);

mapFiltersFormElement.addEventListener('change', () => {
  mainLayer.clearLayers();
  dataFromServer.then((data) => {
    const offerCards = createPopupsInDom(data);
    for (let i = 40; i < 50; i++) {
      createCommonMarker(offerCards, data[i], i);
    }
  }).then(() => activateMap()).catch(() => showOffersLoadErrorMessage());
});

export {
  createCommonMarker,
  closeMapPopups,
  setMapDefaultPosition,
};
