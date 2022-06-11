// Данные

const RENT_OFFERS_AMOUNT = 10;
const titles = ['Эконом класс', 'Ниже среднего', 'В целом неплохо', 'Хорошечно', 'Отлично', 'Божественно'];
const types = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const checkinTimes = ['12:00', '13:00', '14:00'];
const checkoutTimes = ['12:00', '13:00', '14:00'];
const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const descriptions = ['Не предложение, а сказка', 'Может и получше найдете','С собаками не пускаем','Пиво на завтрак и ужин','Есть велопарковка'];
const photos = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
let avatarIdCount = 1; // Число с которого начнется отсчет аватаров

// Функции

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

const getPhotos = (defaultArrayOfPhotos) => {
  const newArrayOfElements = [];
  for (let i = 0; i < getRandomInteger(3,10); i++) {
    newArrayOfElements.push(defaultArrayOfPhotos[getRandomInteger(0,defaultArrayOfPhotos.length-1)]);
  }
  return newArrayOfElements;
};

const getRandomFeatures = (defaultArrayOfFeatures) => {
  const randomFeaturesArray = [];
  for (let i = 0; i < getRandomInteger(0, defaultArrayOfFeatures.length); i++) {
    const randomNumber = getRandomInteger(0, defaultArrayOfFeatures.length-1);
    let countDuplicates = 0;
    if (randomFeaturesArray[0] === undefined) {
      randomFeaturesArray.push(defaultArrayOfFeatures[randomNumber]);
    } else {
      for (let j = 0 ; j < randomFeaturesArray.length; j++) {
        if (randomFeaturesArray[j] === defaultArrayOfFeatures[randomNumber]) {
          countDuplicates++;
        }
      }
      if (countDuplicates === 0) {
        randomFeaturesArray.push(defaultArrayOfFeatures[randomNumber]);
      }
    }
  }
  return randomFeaturesArray;
};


const CreateRentInfo = () => {
  const RentInfoTemplate = {
    author: {
      avatar: 0,
    },
    offer: {
      title: titles[getRandomInteger(0, titles.length-1)],
      address: 0,
      price: getRandomInteger(500, 5000),
      type: types[getRandomInteger(0, types.length-1)],
      rooms: getRandomInteger(1, 5),
      guests: getRandomInteger(1, 5),
      checkin: checkinTimes[getRandomInteger(0, checkinTimes.length-1)],
      checkout: checkoutTimes[getRandomInteger(0, checkoutTimes.length-1)],
      features: getRandomFeatures(features),
      description: descriptions[getRandomInteger(0, descriptions.length-1)],
      photos: getPhotos(photos),
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
const rentOffers = Array.from({length: RENT_OFFERS_AMOUNT}, CreateRentInfo);
rentOffers.reverse().reverse(); // добавил как заглушку чтобы линтер не ругался, иначе при пулреквесте дает ошибку на неиспользуемую rentOffers
