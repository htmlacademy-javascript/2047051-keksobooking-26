import {
  disableElements,
  enableElements,
  disableElement,
  enableElement,
} from './utils.js';

const adFormElement = document.querySelector('.ad-form');
const adFormInteractiveElements = adFormElement.querySelectorAll('select,input,textarea,button');
const mapFiltersFormElement = document.querySelector('.map__filters');
const mapFiltersInteractiveElements = mapFiltersFormElement.querySelectorAll('select,input');


const deactivateAdForm = () => {
  disableElements(adFormInteractiveElements);
  disableElement(adFormElement);
};

const deactivateMap = () => {
  disableElements(mapFiltersInteractiveElements);
  disableElement(mapFiltersFormElement);
};

const activateAdForm = () => {
  enableElements(adFormInteractiveElements);
  enableElement(adFormElement);
};

const activateMap = () => {
  enableElements(mapFiltersInteractiveElements);
  enableElement(mapFiltersFormElement);
};

export {
  deactivateAdForm,
  deactivateMap,
  activateAdForm,
  activateMap,
  adFormElement,
  mapFiltersFormElement,
};
