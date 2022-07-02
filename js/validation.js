import {
  getRoomEnding,
  getGuestEnding
} from './create-dom-elements.js';

import {adFormElement} from './form.js';

const MAX_ROOMS_AMOUNT = '100';
const MIN_GUESTS_AMOUNT = '0';
const TimesInOut = {
  TWELVE: '12:00',
  THIRTEEN: '13:00',
  FOURTEEN: '14:00',
};
const FlatTypes = {
  BUNGALOW: 'bungalow',
  FLAT: 'flat',
  HOTEL: 'hotel',
  HOUSE: 'house',
  PALACE: 'palace',
};
const FlatTypesPrice = {
  BUNGALOW: '0',
  FLAT: '1000',
  HOTEL: '3000',
  HOUSE: '5000',
  PALACE: '10000',
};
const roomNumberElement = document.querySelector('#room_number');
const capacityElement = document.querySelector('#capacity');
const timeInElement = document.querySelector('#timein');
const timeOutElement = document.querySelector('#timeout');
const typeElement = document.querySelector('#type');
const priceElement = document.querySelector('#price');
const timeField = document.querySelector('.ad-form__element--time');
let roomNumberElementValue = roomNumberElement.value;
let capacityElementValue = capacityElement.value;

const defaultPristineConfig = {
  classTo: 'js-validation',
  errorTextParent: 'js-validation',
  errorTextClass: 'js-validation__error-text'
};

const pristine = new Pristine(adFormElement, defaultPristineConfig, true);

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

const validateRoomsErrorMessage = () => {
  if (roomNumberElementValue === MAX_ROOMS_AMOUNT) {
    return `${roomNumberElementValue} комнат не для гостей`;
  } else if (capacityElementValue === MIN_GUESTS_AMOUNT) {
    return 'Не для гостей от 100 комнат';
  } else {
    return `${roomNumberElementValue} ${getRoomEnding(roomNumberElementValue)} не вместит ${capacityElementValue} ${getGuestEnding(capacityElementValue)}`;
  }
};

const syncTimeInOut = (evt) => {
  switch (evt.target.value) {
    case TimesInOut.TWELVE:
      timeInElement.selectedIndex = 0;
      timeOutElement.selectedIndex = 0;
      break;
    case TimesInOut.THIRTEEN:
      timeInElement.selectedIndex = 1;
      timeOutElement.selectedIndex = 1;
      break;
    case TimesInOut.FOURTEEN:
      timeInElement.selectedIndex = 2;
      timeOutElement.selectedIndex = 2;
      break;
  }
};

const setAtributesMinPrice = (price) => {
  priceElement.setAttribute('min', `${price}`);
  priceElement.setAttribute('placeholder', `${price}`);
};

const getTypeMinPrice = () => {
  switch (typeElement.value) {
    case FlatTypes.BUNGALOW:
      setAtributesMinPrice(FlatTypesPrice.BUNGALOW);
      break;
    case FlatTypes.FLAT:
      setAtributesMinPrice(FlatTypesPrice.FLAT);
      break;
    case FlatTypes.HOTEL:
      setAtributesMinPrice(FlatTypesPrice.HOTEL);
      break;
    case FlatTypes.HOUSE:
      setAtributesMinPrice(FlatTypesPrice.HOUSE);
      break;
    case FlatTypes.PALACE:
      setAtributesMinPrice(FlatTypesPrice.PALACE);
      break;
  }
  return priceElement.getAttribute('min');
};

const getPriceValidBool = () => {
  if (Number(priceElement.value) < Number(getTypeMinPrice())) {
    return false;
  }
  return true;
};

const validatePriceErrorMessage = () => `Не дешевле ${getTypeMinPrice()}`;

typeElement.addEventListener('change', getTypeMinPrice);
timeField.addEventListener('change', syncTimeInOut);
pristine.addValidator(capacityElement, getRoomsValidBool, validateRoomsErrorMessage);
pristine.addValidator(priceElement, getPriceValidBool, validatePriceErrorMessage);
