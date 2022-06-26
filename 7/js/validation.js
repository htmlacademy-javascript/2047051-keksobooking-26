import {
  getRoomEnding,
  getGuestEnding
} from './create-dom-elements.js';

import {adFormElement} from './form.js';

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
  if (Number(roomNumberElementValue) >= Number(capacityElementValue) && roomNumberElementValue !== '100' && capacityElementValue !=='0') {
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

pristine.addValidator(roomNumberElement, getValidBool, validateErrorMessage);
pristine.addValidator(capacityElement, getValidBool, validateErrorMessage);
