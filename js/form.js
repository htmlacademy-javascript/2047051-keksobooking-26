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

const deactivatePage = () => {
  disableElements(adFormInteractiveElements);
  disableElement(adFormElement);
  disableElements(mapFiltersInteractiveElements);
  disableElement(mapFiltersFormElement);
};

const activatePage = () => {
  enableElements(adFormInteractiveElements);
  enableElement(adFormElement);
  enableElements(mapFiltersInteractiveElements);
  enableElement(mapFiltersFormElement);
};

export {
  deactivatePage,
  activatePage,
  adFormElement,
};
