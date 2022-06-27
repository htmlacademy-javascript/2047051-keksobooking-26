import {
  getRoomEnding,
  getGuestEnding
} from './create-dom-elements.js';

import {adFormElement} from './form.js';

const MAX_ROOMS_AMOUNT = '100';
const MIN_GUESTS_AMOUNT = '0';
const roomNumberElement = document.querySelector('#room_number');
const capacityElement = document.querySelector('#capacity');
let roomNumberElementValue = roomNumberElement.value;
let capacityElementValue = capacityElement.value;

const defaulPristinetConfig = {
  classTo: 'js-validation',
  errorTextParent: 'js-validation',
  errorTextClass: 'js-validation__error-text'
};
const pristine = new Pristine(adFormElement, defaulPristinetConfig, true);

adFormElement.addEventListener('submit', (evt) => {
  const isValidForm = pristine.validate();
  if (!isValidForm) {
    evt.preventDefault();
  }
});

const getValidBool = () => {
  roomNumberElementValue = roomNumberElement.value;
  capacityElementValue = capacityElement.value;
  if (Number(roomNumberElementValue) >= Number(capacityElementValue) && roomNumberElementValue !== MAX_ROOMS_AMOUNT && capacityElementValue !== MIN_GUESTS_AMOUNT) {
    return true;
  } else if(roomNumberElementValue === MAX_ROOMS_AMOUNT && capacityElementValue === MIN_GUESTS_AMOUNT) {
    return true;
  } else {
    return false;
  }
};

const validateErrorMessage = () => {
  if (roomNumberElementValue === MAX_ROOMS_AMOUNT) {
    return `${roomNumberElementValue} комнат не для гостей`;
  } else if (capacityElementValue === MIN_GUESTS_AMOUNT) {
    return 'Не для гостей от 100 комнат';
  } else {
    return `${roomNumberElementValue} ${getRoomEnding(roomNumberElementValue)} не вместит ${capacityElementValue} ${getGuestEnding(capacityElementValue)}`;
  }
};

pristine.addValidator(roomNumberElement, getValidBool, validateErrorMessage);
pristine.addValidator(capacityElement, getValidBool, validateErrorMessage);
