// Данные

const RENT_OFFERS_AMOUNT = 10;
const titlesList = ['Эконом класс', 'Ниже среднего', 'В целом неплохо', 'Хорошечно', 'Отлично', 'Божественно'];
const rentEstateTypesList = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const checkinTimeList = ['12:00', '13:00', '14:00'];
const checkoutTimeList = ['12:00', '13:00', '14:00'];
const featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const description = ['Не предложение, а сказка', 'Может и получше найдёте','С собаками не пускаем','Пиво на завтрак и ужин','Есть парковочное место'];
const photosList = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

// Функции

const getRandomInteger = (scaleLow, scaleHigh) => {
  if (scaleLow === scaleHigh) {
    return scaleLow;
  } else if (scaleLow < 0 || scaleLow > scaleHigh) {
    throw new RangeError ('Диапазон меньше 0 или отрицательное начальное значание');
  }
  const range = scaleHigh - scaleLow;
  return Math.round(Math.random()*range+scaleLow);
};

const getRandomFloat = (scaleLow, scaleHigh, digitsAfterDecimalPoint = 0) => {
  const range = scaleHigh - scaleLow;
  if (scaleLow === scaleHigh) {
    return scaleLow;
  } else if (scaleLow < 0 || scaleLow > scaleHigh) {
    throw new RangeError ('Диапазон меньше 0 или отрицательное начальное значание');
  } else if (digitsAfterDecimalPoint < 0) {
    throw new RangeError ('Количество знаков после запятой не может быть меньше 0');
  } else if (digitsAfterDecimalPoint === 0) {
    return Math.round(Math.random()*range+scaleLow);
  }
  const floatRange = Math.random()*range+scaleLow;
  return Number(floatRange.toFixed(digitsAfterDecimalPoint));
};

const getAvatar = () => {
  const avatarNumber = String(getRandomInteger(1,10));
  return (avatarNumber.length < 2) ? `img/avatars/user0${avatarNumber}.png` : `img/avatars/user${avatarNumber}.png`;
};
getAvatar();

const getArrayPhotos = (defaultArrayOfElements) => {
  const newArrayOfElements = [];
  for (let i = 0; i < getRandomInteger(3,10); i++) {
    newArrayOfElements.push(defaultArrayOfElements[getRandomInteger(0,defaultArrayOfElements.length-1)]);
  }
  return newArrayOfElements;
};

const getRandomFeatures = () => {
  const randomFeaturesArray = [];
  for (let i = 0; i < getRandomInteger(0, featuresList.length); i++) {
    const randomNumber = getRandomInteger(0, featuresList.length-1);
    let countDuplicates = 0;
    if (randomFeaturesArray.length < 1) {
      randomFeaturesArray.push(featuresList[randomNumber]);
    } else {
      for (let j = 0 ; j < randomFeaturesArray.length; j++) {
        if (randomFeaturesArray[j] === featuresList[randomNumber]) {
          countDuplicates++;
        }
      }
      if (countDuplicates === 0) {
        randomFeaturesArray.push(featuresList[randomNumber]);
      }
    }
  }
  return randomFeaturesArray;
};

let avatarIdCount = 1;

const createRentInfo = () => {
  const RentInfoTemplate = {
    author: {
      avatar: 0,
    },
    offer: {
      title: titlesList[getRandomInteger(0, titlesList.length-1)],
      address: 0,
      price: getRandomInteger(500, 5000),
      type: rentEstateTypesList[getRandomInteger(0, rentEstateTypesList.length-1)],
      rooms: getRandomInteger(1, 5),
      guests: getRandomInteger(1, 5),
      checkin: checkinTimeList[getRandomInteger(0, checkinTimeList.length-1)],
      checkout: checkoutTimeList[getRandomInteger(0, checkoutTimeList.length-1)],
      features: getRandomFeatures(),
      description: description[getRandomInteger(0, description.length-1)],
      photos: getArrayPhotos(photosList),
    },
    location: {
      lat: getRandomFloat(35.65, 35.7, 5),
      lng: getRandomFloat(139.7, 139.8, 5),
    },
  };
  RentInfoTemplate.offer.address = `${RentInfoTemplate.location.lat}, ${RentInfoTemplate.location.lng}`;
  RentInfoTemplate.author.avatar = (String(avatarIdCount).length < 2) ? `img/avatars/user0${avatarIdCount}.png` : `img/avatars/user${avatarIdCount}.png`;
  avatarIdCount++;
  return RentInfoTemplate;
};

const rentOffersList = Array.from({length: RENT_OFFERS_AMOUNT}, createRentInfo);
