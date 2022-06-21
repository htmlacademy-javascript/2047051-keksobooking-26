import './utils.js';

import {rentOffers} from './data.js';

import {
  createCardsInDom,
} from './create-dom-elements.js';

import {
  deactivateAdForm,
  deactivateMap,
  deactivatePage,
  activateAdForm,
  activateMap,
  activatePage,
} from './form.js';

const offersList = rentOffers();

deactivateMap();
deactivateAdForm();
deactivatePage();

createCardsInDom(offersList);

activateAdForm();
activateMap();
activatePage();
