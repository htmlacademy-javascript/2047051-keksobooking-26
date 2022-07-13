const MAX_MARKERS_ON_MAP = 10;
const DEFAULT_LAT = 35.68173;
const DEFAULT_LNG = 139.75393;
const DEFAULT_MAP_ZOOM = 13;
const GET_DATA_ADDRESS = 'https://26.javascript.pages.academy/keksobooking/data';
const SEND_DATA_ADDRESS = 'https://26.javascript.pages.academy/keksobooking';
const DEFAULT_AVATAR_SRC = 'img/muffin-grey.svg';
const TIME_TO_DISPLAY_MAP_MESSAGE = 10000;
const MIN_PRICE = 0;
const MAX_PRICE = 100000;
const MAX_ROOMS_AMOUNT = '100';
const MIN_GUESTS_AMOUNT = '0';
const TIME_TO_DISPLAY_MESSAGE = 10000;
const REFRESH_DEBOUNCE_TIME = 500;
const SUBMIT_DEBOUNCE_TIME = 500;
const MAIN_ICON = L.icon(
  {
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26,52],
  }
);
const COMMON_ICON = L.icon(
  {
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20,40],
  }
);
const Times = {
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
const Prices = {
  lowSetPoint: 10000,
  highSePoint: 50000,
};

export {
  MAX_MARKERS_ON_MAP,
  DEFAULT_LAT,
  DEFAULT_LNG,
  DEFAULT_MAP_ZOOM,
  REFRESH_DEBOUNCE_TIME,
  GET_DATA_ADDRESS,
  TIME_TO_DISPLAY_MAP_MESSAGE,
  MIN_PRICE,
  MAX_PRICE,
  MAX_ROOMS_AMOUNT,
  MIN_GUESTS_AMOUNT,
  TIME_TO_DISPLAY_MESSAGE,
  SUBMIT_DEBOUNCE_TIME,
  DEFAULT_AVATAR_SRC,
  SEND_DATA_ADDRESS,
  MAIN_ICON,
  COMMON_ICON,
  Times,
  FlatTypes,
  FlatTypesPrice,
  Prices,
};
