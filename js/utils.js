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
  for (let i = 0; i < getRandomInteger(3,10); i++) {
    newArrayOfElements.push(defaultArrayOfPhotos[getRandomInteger(0,defaultArrayOfPhotos.length-1)]);
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

// const getFeaturesRussianNames = (features) => {
//   features.map
// }

export {
  getRandomInteger,
  getRandomFloat,
  getRandomArrayElement,
  getPhotos,
  getRandomFeatures
};
