import {
  getRoomEnding,
  getGuestEnding,
  getSuccessMessage,
  getErrorMessage,
} from './create-dom-elements.js';

import {adFormElement} from './form.js';

import {sendData} from './api.js';

import {
  closeMapPopups,
  setMapDefaultPosition,
} from './map-markers.js';

const MIN_PRICE = 0;
const MAX_PRICE = 100000;
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
const noUiSliderElement = document.querySelector('.ad-form__slider');
const formElements = document.querySelectorAll('form');
const resetButtonElement = adFormElement.querySelector('.ad-form__reset');
let roomNumberElementValue = roomNumberElement.value;
let capacityElementValue = capacityElement.value;

const defaultPristineConfig = {
  classTo: 'js-validation',
  errorTextParent: 'js-validation',
  errorTextClass: 'js-validation__error-text'
};

const pristine = new Pristine(adFormElement, defaultPristineConfig, true);

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
  priceElement.setAttribute('placeholder', `от ${price}`);
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

noUiSlider.create(noUiSliderElement, {
  range: {
    min: Number(priceElement.getAttribute('value')),
    max: MAX_PRICE,
  },
  start: MIN_PRICE,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value;
      }
      return value.toFixed(0);
    },
    from: function (value) {
      return Number(value);
    }
  },
});

noUiSliderElement.noUiSlider.on('slide', () => {
  priceElement.value = noUiSliderElement.noUiSlider.get();
  pristine.validate(priceElement);
});

const setNoUiSliderOptions = () => {
  noUiSliderElement.noUiSlider.updateOptions({
    range: {
      min: Number(priceElement.getAttribute('min')),
      max: MAX_PRICE,
    },
    start: priceElement.value,
  });
};

const setNoUiSliderValue = () => {
  noUiSliderElement.noUiSlider.set(priceElement.value);
};

const resetAllForms = () => {
  closeMapPopups();
  noUiSliderElement.noUiSlider.updateOptions({
    start: 0,
  });
  for (const formElement of formElements) {
    formElement.reset();
  }
};

const sendOffersToServer = (evt) => {
  evt.preventDefault();
  const isValidForm = pristine.validate();
  if (isValidForm) {
    const formData = new FormData(evt.target);
    sendData('https://26.javascript.pages.academy/keksobooking',getSuccessMessage, getErrorMessage, formData, setMapDefaultPosition);
  }
};

adFormElement.addEventListener('submit', sendOffersToServer);

resetButtonElement.addEventListener('click', resetAllForms);

typeElement.addEventListener('change', getTypeMinPrice);

typeElement.addEventListener('change', setNoUiSliderOptions);

priceElement.addEventListener('change', setNoUiSliderValue);

timeField.addEventListener('change', syncTimeInOut);

pristine.addValidator(capacityElement, getRoomsValidBool, validateRoomsErrorMessage);

pristine.addValidator(priceElement, getPriceValidBool, validatePriceErrorMessage);

export {resetAllForms};
