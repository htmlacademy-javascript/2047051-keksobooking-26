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

const deactivatePage = () => {
  deactivateAdForm();
  deactivateMap();
};

const activateAdForm = () => {
  enableElements(adFormInteractiveElements);
  enableElement(adFormElement);
};

const activateMap = () => {
  enableElements(mapFiltersInteractiveElements);
  enableElement(mapFiltersFormElement);
};

const activatePage = () => {
  activateAdForm();
  activateMap();
};

export {
  deactivateAdForm,
  deactivateMap,
  deactivatePage,
  activateAdForm,
  activateMap,
  activatePage,
  adFormElement,
  mapFiltersFormElement,
};
