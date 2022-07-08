const getRandomInteger = (scaleLow, scaleHigh) => {
  if (scaleLow === scaleHigh) {
    return scaleLow;
  } else if (scaleLow < 0 || scaleLow > scaleHigh) {
    throw new RangeError ('Диапазон меньше 0 или отрицательное начальное значание');
  }
  return Math.round(Math.random()*(scaleHigh - scaleLow)+scaleLow);
};

const getRandomFloat = (scaleLow, scaleHigh, digitsAfterDecimalPoint = 0) => {
  if (digitsAfterDecimalPoint === 0) {
    return getRandomInteger(scaleLow,scaleHigh);
  } else if (digitsAfterDecimalPoint < 0) {
    throw new RangeError ('Количество знаков после запятой не может быть меньше 0');
  }
  return Number((Math.random()*(scaleHigh - scaleLow)+scaleLow).toFixed(digitsAfterDecimalPoint));
};

const getRandomArrayElement = (arrayOfElements) => arrayOfElements[getRandomInteger(0, arrayOfElements.length-1)];

const getPhotos = (defaultArrayOfPhotos) => {
  const newArrayOfElements = [];
  for (let i = 0; i <= getRandomInteger(0,defaultArrayOfPhotos.length-1); i++) {
    newArrayOfElements.push(getRandomArrayElement(defaultArrayOfPhotos));
  }
  return newArrayOfElements;
};

const getRandomFeatures = (defaultArrayOfFeatures) => {
  const randomFeaturesArray = [];
  for (let i = 0; i <= getRandomInteger(0, defaultArrayOfFeatures.length-1); i++) {
    const randomNumber = getRandomInteger(0, defaultArrayOfFeatures.length-1);
    let countDuplicates = 0;
    for (let j = 0 ; j < randomFeaturesArray.length; j++) {
      if (randomFeaturesArray[j] === defaultArrayOfFeatures[randomNumber]) {
        countDuplicates++;
      }
    }
    if (countDuplicates === 0) {
      randomFeaturesArray.push(defaultArrayOfFeatures[randomNumber]);
    }
  }
  return randomFeaturesArray;
};

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

const displayOffersLoadErrorMessage = () => {
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

  setTimeout(() => mapLoadFailedMessage.remove(), 10000);
};

export {
  getRandomInteger,
  getRandomFloat,
  getRandomArrayElement,
  getPhotos,
  getRandomFeatures,
  getRussianTypesNames,
  getRoomEnding,
  getGuestEnding,
  getFeaturesAsDomElements,
  setPhotoSrc,
  disableElements,
  enableElements,
  disableElement,
  enableElement,
  displayOffersLoadErrorMessage,
};
