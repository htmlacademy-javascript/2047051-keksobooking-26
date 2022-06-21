import './utils.js';

import {rentOffers} from './data.js';

import {
  createCardsInDom,
  offersFragmentElement,
} from './create-dom-elements.js';

const offersList = rentOffers();

createCardsInDom(offersList);

document.querySelector('#map-canvas').append(offersFragmentElement.children[2]);
