import {adFormElement} from './dom-elements.js';

import {sendData} from './api.js';

import {
  getSuccessMessage,
  getErrorMessage,
  getRoomEnding,
  getGuestEnding,
  createEventListeners,
} from './utils.js';

import {
  closeMapPopups,
  setMapDefaultPosition,
  showMapMarkers,
  clearMap,
} from './map-markers.js';

import {
  MIN_PRICE,
  MAX_PRICE,
  MAX_ROOMS_AMOUNT,
  MIN_GUESTS_AMOUNT,
  TIME_TO_DISPLAY_MESSAGE,
  DEFAULT_AVATAR_SRC,
  SEND_DATA_ADDRESS,
  Times,
  FlatTypes,
  FlatTypesPrice,
} from './values.js';

import {
  roomNumberElement,
  capacityElement,
  timeInElement,
  timeOutElement,
  typeElement,
  priceElement,
  timeField,
  noUiSliderElement,
  formElements,
  resetButtonElement,
  submitButtonElement,
  offerAvatarPreviewElement,
  offerImagePreviewElement,
} from './dom-elements.js';

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
  } else {
    return roomNumberElementValue === MAX_ROOMS_AMOUNT && capacityElementValue === MIN_GUESTS_AMOUNT;
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

const syncTimeFields = (evt) => {
  switch (evt.target.value) {
    case Times.TWELVE:
      timeInElement.selectedIndex = 0;
      timeOutElement.selectedIndex = 0;
      break;
    case Times.THIRTEEN:
      timeInElement.selectedIndex = 1;
      timeOutElement.selectedIndex = 1;
      break;
    case Times.FOURTEEN:
      timeInElement.selectedIndex = 2;
      timeOutElement.selectedIndex = 2;
      break;
  }
};

const setAttributesMinPrice = (price) => {
  priceElement.setAttribute('min', `${price}`);
  priceElement.setAttribute('placeholder', `от ${price}`);
};

const getTypeMinPrice = () => {
  switch (typeElement.value) {
    case FlatTypes.BUNGALOW:
      setAttributesMinPrice(FlatTypesPrice.BUNGALOW);
      break;
    case FlatTypes.FLAT:
      setAttributesMinPrice(FlatTypesPrice.FLAT);
      break;
    case FlatTypes.HOTEL:
      setAttributesMinPrice(FlatTypesPrice.HOTEL);
      break;
    case FlatTypes.HOUSE:
      setAttributesMinPrice(FlatTypesPrice.HOUSE);
      break;
    case FlatTypes.PALACE:
      setAttributesMinPrice(FlatTypesPrice.PALACE);
      break;
  }
  return priceElement.getAttribute('min');
};

const getPriceValidBool = () => Number(priceElement.value) >= Number(getTypeMinPrice());

const validatePriceErrorMessage = () => `Не дешевле ${getTypeMinPrice()}`;

noUiSlider.create(noUiSliderElement, {
  range: {
    min: Number(getTypeMinPrice()),
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
  clearMap();
  pristine.reset();
  offerAvatarPreviewElement.src = DEFAULT_AVATAR_SRC;
  const offerImageElements = offerImagePreviewElement.querySelectorAll('img');
  for (const offerImage of offerImageElements) {
    offerImage.remove();
  }
  noUiSliderElement.noUiSlider.updateOptions({
    start: 0,
  });
  for (const formElement of formElements) {
    formElement.reset();
  }
  showMapMarkers();
};

const handleSendData = (evt) => {
  const formData = new FormData(evt.target);
  submitButtonElement.disabled = true;
  sendData(SEND_DATA_ADDRESS, formData)
    .then((response) => {
      if (!response.ok) {
        throw new Error (`${response.status} - ${response.statusText}`);
      }
      resetAllForms();
      setMapDefaultPosition();
      const message = getSuccessMessage();
      document.body.append(message);
      createEventListeners(message, TIME_TO_DISPLAY_MESSAGE);
    }).catch(() => {
      const message = getErrorMessage();
      const errorButtonElement = message.querySelector('.error__button');
      errorButtonElement.addEventListener('click', () => {
        message.remove();
      });
      document.body.append(message);
      createEventListeners(message, TIME_TO_DISPLAY_MESSAGE);
    }).finally(() => {
      submitButtonElement.disabled = false;
    });
};

const sendOffersToServer = (evt) => {
  evt.preventDefault();
  const isValidForm = pristine.validate();
  if (isValidForm) {
    handleSendData(evt);
  }
};

const onSubmitButtonClick = sendOffersToServer;

const onResetButtonClick = resetAllForms;

const onPriceElementChange = setNoUiSliderValue;

const onTimeFieldChange = syncTimeFields;

const onTypeElementChange = () => {
  getTypeMinPrice();
  setNoUiSliderOptions();
};

pristine.addValidator(capacityElement, getRoomsValidBool, validateRoomsErrorMessage);

pristine.addValidator(priceElement, getPriceValidBool, validatePriceErrorMessage);

adFormElement.addEventListener('submit', onSubmitButtonClick);

resetButtonElement.addEventListener('click', onResetButtonClick);

typeElement.addEventListener('change', onTypeElementChange);

priceElement.addEventListener('change', onPriceElementChange);

timeField.addEventListener('change', onTimeFieldChange);

roomNumberElement.addEventListener('change', () => pristine.validate(capacityElement));

export {
  resetAllForms,
};
