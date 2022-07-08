import {createCommonMarker} from './map-markers.js';

import {createCardsInDom} from './create-dom-elements.js';

const getData = (address) => fetch(address)
  .then((response) => response.json())
  .then((data) => {
    const offerCards = createCardsInDom(data);
    data.forEach((offer, index) => {
      createCommonMarker(offerCards, offer, index);
    });
  });

getData('https://26.javascript.pages.academy/keksobooking/data');

