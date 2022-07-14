import {
  disableElements,
  enableElements,
  disableElement,
  enableElement,
} from './utils.js';

import {
  adFormElement,
  adFormInteractiveElements,
  mapFiltersFormElement,
  mapFiltersInteractiveElements,
  noUiSliderElement,
} from './dom-elements.js';

const deactivateAdForm = () => {
  disableElements(adFormInteractiveElements);
  disableElement(adFormElement);
  noUiSliderElement.setAttribute('disabled', true);
};

const deactivateMap = () => {
  disableElements(mapFiltersInteractiveElements);
  disableElement(mapFiltersFormElement);
};

const activateAdForm = () => {
  enableElements(adFormInteractiveElements);
  enableElement(adFormElement);
  noUiSliderElement.removeAttribute('disabled');
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
};
