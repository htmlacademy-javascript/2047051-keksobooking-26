import {
  getRandomInteger,
  getRandomFloat,
  getRandomArrayElement,
  getPhotos,
  getRandomFeatures
} from '/js/utils.js';

const RENT_OFFERS_AMOUNT = 10;
const TITLES = [
  'Эконом класс',
  'Ниже среднего',
  'В целом неплохо',
  'Хорошечно',
  'Отлично',
  'Божественно',
];
const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const TIMES = [
  '12:00',
  '13:00',
  '14:00',
];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const DESCRIPTIONS = [
  'Не предложение, а сказка',
  'Может и получше найдете',
  'С собаками не пускаем',
  'Пиво на завтрак и ужин',
  'Есть велопарковка',
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const LAT_FROM = 35.65;
const LAT_TO = 35.7;
const LNG_FROM = 139.7;
const LNG_TO = 139.8;
const PRICE_PER_NIGHT = 100000;
let avatarIdCount = 1; // Число с которого начнется отсчет аватаров

const CreateRentInfo = () => {
  const RentInfoTemplate = {
    author: {
      avatar: undefined,
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: undefined,
      price: getRandomInteger(0, PRICE_PER_NIGHT),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomInteger(1, 3),
      guests: getRandomInteger(1, 3),
      checkin: getRandomArrayElement(TIMES),
      checkout: getRandomArrayElement(TIMES),
      features: getRandomFeatures(FEATURES),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getPhotos(PHOTOS),
    },
    location: {
      lat: getRandomFloat(LAT_FROM, LAT_TO, 5),
      lng: getRandomFloat(LNG_FROM, LNG_TO, 5),
    },
  };
  RentInfoTemplate.offer.address = `${RentInfoTemplate.location.lat}, ${RentInfoTemplate.location.lng}`;
  RentInfoTemplate.author.avatar = (String(avatarIdCount).length < 2) ? `img/avatars/user0${avatarIdCount}.png` : `img/avatars/user${avatarIdCount}.png`;
  avatarIdCount++;
  return RentInfoTemplate;
};
const rentOffers = () => Array.from({length: RENT_OFFERS_AMOUNT}, CreateRentInfo);

export {rentOffers};
