import {
  deactivatePage,
  activateMap,
  activateAdForm,
  mapFiltersFormElement,
} from './form-state.js';

import {
  showOffersLoadErrorMessage,
  debounce,
} from './utils.js';

import {getData} from './api.js';

import {createPopupsInDom} from './create-dom-elements.js';

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

deactivatePage();

const resetButtonElement = document.querySelector('.ad-form__reset');
const addressElement = document.querySelector('#address');

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

const dataFromServer = getData(GET_DATA_ADDRESS, showOffersLoadErrorMessage);

map.on('load', dataFromServer);

const showInitialMapMarkers = () => {
  dataFromServer.then((data) => {
    showFilteredMarkers(data,createPopupsInDom, createCommonMarker);
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

const refreshMarkersOnMap = debounce(
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
