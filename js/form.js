import {
  disableElements,
  enableElements,
  disableElement,
  enableElement,
} from './utils.js';

const adFormElement = document.querySelector('.ad-form');
const adFormSelectElements = adFormElement.querySelectorAll('select');
const adFormInputElements = adFormElement.querySelectorAll('input');
const adFormTextareaElements = adFormElement.querySelectorAll('textarea');
const adFormButtonElements = adFormElement.querySelectorAll('button');

const mapFiltersElement = document.querySelector('.map__filters');
const mapFiltersSelectElements = mapFiltersElement.querySelectorAll('select');
const mapFiltersInputElements = mapFiltersElement.querySelectorAll('input');

const deactivateAdForm = () => {
  disableElements(adFormSelectElements);
  disableElements(adFormInputElements);
  disableElements(adFormTextareaElements);
  disableElements(adFormButtonElements);

  disableElement(adFormElement);
};
const deactivateMap = () => {
  disableElements(mapFiltersSelectElements);
  disableElements(mapFiltersInputElements);

  disableElement(mapFiltersElement);
};
const deactivatePage = () => {
  deactivateAdForm();
  deactivateMap();
};

const activateAdForm = () => {
  enableElements(adFormSelectElements);
  enableElements(adFormInputElements);
  enableElements(adFormTextareaElements);
  enableElements(adFormButtonElements);

  enableElement(adFormElement);
};
const activateMap = () => {
  enableElements(mapFiltersSelectElements);
  enableElements(mapFiltersInputElements);

  enableElement(mapFiltersElement);
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
};
