import {
  getRoomEnding,
  getGuestEnding
} from './create-dom-elements.js';

import {adFormElement} from './form.js';

const MAX_ROOMS_AMOUNT = '100';
const MIN_GUESTS_AMOUNT = '0';
const roomNumberElement = document.querySelector('#room_number');
const capacityElement = document.querySelector('#capacity');
const timeInElement = document.querySelector('#timein');
const timeOutElement = document.querySelector('#timeout');
// const typeElement = document.querySelector('#type');
// const priceElement = document.querySelector('#price');
let roomNumberElementValue = roomNumberElement.value;
let capacityElementValue = capacityElement.value;
let timeInElementValue = timeInElement.value;
let timeOutElementValue = timeOutElement.value;

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

const getRoomsValidBool = () => {
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

const setTimein = () => {
  timeInElementValue = timeInElement.value;
  timeOutElementValue = timeOutElement.value;
  switch (timeOutElementValue) {
    case '12:00':
      timeInElement.selectedIndex = 0;
      break;
    case '13:00':
      timeInElement.selectedIndex = 1;
      break;
    case '14:00':
      timeInElement.selectedIndex = 2;
      break;
  }
};
const setTimeOut = () => {
  timeInElementValue = timeInElement.value;
  timeOutElementValue = timeOutElement.value;
  switch (timeInElementValue) {
    case '12:00':
      timeOutElement.selectedIndex = 0;
      break;
    case '13:00':
      timeOutElement.selectedIndex = 1;
      break;
    case '14:00':
      timeOutElement.selectedIndex = 2;
      break;
  }
};

timeOutElement.addEventListener('change', setTimein);
timeInElement.addEventListener('change', setTimeOut);
pristine.addValidator(roomNumberElement, getRoomsValidBool, validateErrorMessage);
pristine.addValidator(capacityElement, getRoomsValidBool, validateErrorMessage);
