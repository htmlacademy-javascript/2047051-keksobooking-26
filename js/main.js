import '/js/utils.js';
import { createCardsInDom,offersFragment } from '/js/create-dom-elements.js';
import { rentOffers } from '/js/data.js';

const offersList = rentOffers();

createCardsInDom(offersList);

document.querySelector('#map-canvas').append(offersFragment.children[2]);
