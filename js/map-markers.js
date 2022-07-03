import {
  deactivatePage,
  activatePage,} from './form.js';

import {rentOffers} from './data.js';

import {createCardsInDom} from './create-dom-elements.js';

const defaultLat = 35.67844;
const defaultLng = 139.77376;
const resetButtonElement = document.querySelector('.ad-form__reset');

const addressElement = document.querySelector('#address');

const offersList = rentOffers();

const offerCards = createCardsInDom(offersList);

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

deactivatePage();

const map = L.map('map-canvas').on('load', activatePage).setView({
  lat: defaultLat,
  lng: defaultLng,
}, 12);

const mainLayer = L.layerGroup().addTo(map);

const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

tiles.addTo(mainLayer);

const mainMarker = L.marker(
  {
    lat: defaultLat,
    lng: defaultLng,
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

const createCommonMarker = (offer, index) => {
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
    .bindPopup(offerCards.children[index]);
};

offersList.forEach((offer, index) => {
  createCommonMarker(offer, index);
});

resetButtonElement.addEventListener('click', () => {
  map.setView({
    lat: defaultLat,
    lng: defaultLng,
  }, 12);
  mainMarker.setLatLng({
    lat: defaultLat,
    lng: defaultLng,
  });
});
