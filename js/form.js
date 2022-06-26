import {
  disableElements,
  enableElements,
  disableElement,
  enableElement,
} from './utils.js';

import {
  getRoomEnding,
  getGuestEnding
} from './create-dom-elements.js';

const adFormElement = document.querySelector('.ad-form');
const adFormInteractiveElements = adFormElement.querySelectorAll('select,input,textarea,button');
const mapFiltersFormElement = document.querySelector('.map__filters');
const mapFiltersInteractiveElements = mapFiltersFormElement.querySelectorAll('select,input');
const roomNumberElement = document.querySelector('#room_number');
const capacityElement = document.querySelector('#capacity');
let roomNumberElementValue = roomNumberElement.value;
let capacityElementValue = capacityElement.value;

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

// Валидация

const defaulPristinetConfig = {
  classTo: 'js-validation',
  errorTextParent: 'js-validation',
  errorTextClass: 'js-validation__error-text'
};
const pristine = new Pristine(adFormElement, defaulPristinetConfig, false);

adFormElement.addEventListener('submit', (evt) => {
  const isValidForm = pristine.validate();
  if (!isValidForm) {
    evt.preventDefault();
  }
});

const getValidBool = () => {
  if (roomNumberElementValue >= capacityElementValue && roomNumberElementValue !== '100' && capacityElementValue !=='0') {
    return true;
  } else if(roomNumberElementValue === '100' && capacityElementValue === '0') {
    return true;
  } else {
    return false;
  }
};

const validateErrorMessage = () => {
  if (roomNumberElementValue === '100') {
    return `${roomNumberElementValue} комнат не для гостей`;
  } else if (capacityElementValue ==='0') {
    return 'Не для гостей от 100 комнат';
  } else {
    return `${roomNumberElementValue} ${getRoomEnding(roomNumberElementValue)} не вместит ${capacityElementValue} ${getGuestEnding(capacityElementValue)}`;
  }
};

roomNumberElement.addEventListener('change', () => {
  roomNumberElementValue = roomNumberElement.value;
});

capacityElement.addEventListener('change', () => {
  capacityElementValue = capacityElement.value;
});

pristine.addValidator(roomNumberElement, getValidBool, validateErrorMessage);

export {
  deactivateAdForm,
  deactivateMap,
  deactivatePage,
  activateAdForm,
  activateMap,
  activatePage,
};
