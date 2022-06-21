import '/js/utils.js';

import {rentOffers} from '/js/data.js';

import {
  createCardsInDom,
  offersFragment,
} from '/js/create-dom-elements.js';

const offersList = rentOffers();

createCardsInDom(offersList);

document.querySelector('#map-canvas').append(offersFragment.children[2]);
