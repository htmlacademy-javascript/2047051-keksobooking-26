import {TIME_TO_DISPLAY_MAP_MESSAGE} from './values.js';

const getRussianTypesNames = (type) => {
  switch (type) {
    case 'flat':
      type = 'Квартира';
      break;
    case 'bungalow':
      type = 'Бунгало';
      break;
    case 'house':
      type = 'Дом';
      break;
    case 'palace':
      type = 'Дворец';
      break;
    case 'hotel':
      type = 'Отель';
      break;
  }
  return type;
};

const getRoomEnding = (count) => {
  switch (Number(count)) {
    case 1:
      count = 'комната';
      break;
    case 100:
      count = 'комнат';
      break;
    default:
      count = 'комнаты';
      break;
  }
  return count;
};

const getGuestEnding = (count) => count > 1 ? 'гостей' : 'гостя';

const getFeaturesAsDomElements = (possibleFeatures, featuresInOffer ) => {
  possibleFeatures.forEach((possibleFeaturesItem) => {
    const isIncluded = featuresInOffer.some((featuresInOfferItem) => possibleFeaturesItem.classList.contains(`popup__feature--${featuresInOfferItem}`));
    if (!isIncluded) {
      possibleFeaturesItem.remove();
    }
  });
};

const setPhotoSrc = (photosContainer,photosUrl) => {
  photosUrl.forEach((photo)=>{
    const newPhoto = photosContainer.children[0].cloneNode(true);
    newPhoto.src = photo;
    photosContainer.append(newPhoto);
  });
  photosContainer.children[0].remove();
};

const disableElements = (elementsList) => {
  elementsList.forEach((element) => {
    element.disabled = true;
  });
};

const enableElements = (elementsList) => {
  elementsList.forEach((element) => {
    element.disabled = false;
  });
};

const disableElement = (element) => element.classList.add(`${element.classList[0]}--disabled`);

const enableElement = (element) => element.classList.remove(`${element.classList[0]}--disabled`);

const showOffersLoadErrorMessage = () => {
  const mapElement = document.querySelector('.map');
  const mapLoadFailedMessage = document.createElement('div');
  mapLoadFailedMessage.textContent = 'Загрузка объявлений не удалась, попробуйте обновить страницу';
  mapLoadFailedMessage.style.position = 'absolute';
  mapLoadFailedMessage.style.zIndex = '1000';
  mapLoadFailedMessage.style.left = '0';
  mapLoadFailedMessage.style.top = '0';
  mapLoadFailedMessage.style.width = '100%';
  mapLoadFailedMessage.style.padding = '10px 0 10px 0';
  mapLoadFailedMessage.style.fontSize = '20px';
  mapLoadFailedMessage.style.color = 'white';
  mapLoadFailedMessage.style.backgroundColor = 'red';
  mapLoadFailedMessage.style.textAlign = 'center';

  mapElement.prepend(mapLoadFailedMessage);

  setTimeout(() => mapLoadFailedMessage.remove(), TIME_TO_DISPLAY_MAP_MESSAGE);
};

const createEventListeners = (message, delay) => {
  document.body.append(message);
  const onDocumentKeydown = (evt) => {
    if (evt.key === 'Escape') {
      message.remove();
    }
    document.removeEventListener('keydown', onDocumentKeydown);
  };
  const onDocumentClick = () => {
    message.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  };
  document.addEventListener('keydown', onDocumentKeydown);
  message.addEventListener('click', onDocumentClick);
  setTimeout(() => {
    message.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  }, delay);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  getRussianTypesNames,
  getRoomEnding,
  getGuestEnding,
  getFeaturesAsDomElements,
  setPhotoSrc,
  disableElements,
  enableElements,
  disableElement,
  enableElement,
  showOffersLoadErrorMessage,
  createEventListeners,
  debounce,
};
