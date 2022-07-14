import {
  deactivateAdForm,
  deactivateMap,
  activateMap,
  activateAdForm,
} from './form-state.js';

import {
  showOffersLoadErrorMessage,
  setDebounce,
} from './utils.js';

import {getData} from './api.js';

import {mapFiltersFormElement} from './dom-elements.js';

import {createPopupsInDom} from './create-popups.js';

import {showFilteredMarkers} from './filter.js';

import {
  DEFAULT_LAT,
  DEFAULT_LNG,
  DEFAULT_MAP_ZOOM,
  REFRESH_DEBOUNCE_TIME,
  GET_DATA_ADDRESS,
  MAIN_ICON,
  COMMON_ICON,
} from './values.js';

import {
  resetButtonElement,
  addressElement,
} from './dom-elements.js';

deactivateAdForm();

deactivateMap();

const dataFromServer = getData(GET_DATA_ADDRESS, showOffersLoadErrorMessage);

const map = L.map('map-canvas');

map.on('load', activateAdForm).setView({
  lat: DEFAULT_LAT,
  lng: DEFAULT_LNG,
}, DEFAULT_MAP_ZOOM);

map.on('load', dataFromServer);

const mainLayer = L.layerGroup().addTo(map);

const mainMarker = L.marker(
  {
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  },
  {
    draggable: true,
    icon: MAIN_ICON,
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
      icon: COMMON_ICON,
    }
  );
  marker
    .addTo(mainLayer)
    .bindPopup(parentElement.children[index]);
};

const clearMap = () => mainLayer.clearLayers();

const closeMapPopups = () => {
  map.closePopup();
};

const showInitialMapMarkers = () => {
  dataFromServer.then((data) => {
    showFilteredMarkers(data, createPopupsInDom, createCommonMarker);
  }).then(() => activateMap()).catch(() => showOffersLoadErrorMessage());
};

showInitialMapMarkers();

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

const refreshMarkersOnMap = setDebounce(
  () => {
    clearMap();
    dataFromServer.then((data) => {
      showFilteredMarkers(data,createPopupsInDom, createCommonMarker);
    }).then(() => activateMap()).catch(() => showOffersLoadErrorMessage());
  },
  REFRESH_DEBOUNCE_TIME
);

resetButtonElement.addEventListener('click', onResetButtonClick);
mapFiltersFormElement.addEventListener('change', refreshMarkersOnMap);

export {
  createCommonMarker,
  closeMapPopups,
  setMapDefaultPosition,
  showInitialMapMarkers,
  clearMap,
};
