import {createCommonMarker} from './map-markers.js';

import {createCardsInDom} from './create-dom-elements.js';

import {displayOffersLoadErrorMessage} from './utils.js';

const getData = (address) => fetch(address)
  .then((response) => response.json())
  .then((data) => {
    const offerCards = createCardsInDom(data);
    data.forEach((offer, index) => {
      createCommonMarker(offerCards, offer, index);
    });
  })
  .catch(() => {
    displayOffersLoadErrorMessage();
  });

getData('https://26.javascript.pages.academ/keksobooking/data');

