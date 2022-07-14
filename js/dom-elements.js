
const cardTemplateElement = document.querySelector('#card').content;
const parentElement = cardTemplateElement.querySelector('.popup');
const housingTypeElement = document.querySelector('#housing-type');
const housingPriceElement = document.querySelector('#housing-price');
const housingGuestsElement = document.querySelector('#housing-guests');
const housingRoomsElement = document.querySelector('#housing-rooms');
const housingFeatureElements = document.querySelector('#housing-features').querySelectorAll('input');
const adFormElement = document.querySelector('.ad-form');
const adFormInteractiveElements = adFormElement.querySelectorAll('select,input,textarea,button');
const mapFiltersFormElement = document.querySelector('.map__filters');
const mapFiltersInteractiveElements = mapFiltersFormElement.querySelectorAll('select,input');
const resetButtonElement = document.querySelector('.ad-form__reset');
const addressElement = document.querySelector('#address');
const offerAvatarChooserElement = document.querySelector('#avatar');
const offerAvatarPreviewElement = document.querySelector('.ad-form-header__preview').querySelector('img');
const offerImageChooserElement = document.querySelector('#images');
const offerImagePreviewElement = document.querySelector('.ad-form__photo');
const roomNumberElement = document.querySelector('#room_number');
const capacityElement = document.querySelector('#capacity');
const timeInElement = document.querySelector('#timein');
const timeOutElement = document.querySelector('#timeout');
const typeElement = document.querySelector('#type');
const priceElement = document.querySelector('#price');
const timeField = document.querySelector('.ad-form__element--time');
const noUiSliderElement = document.querySelector('.ad-form__slider');
const formElements = document.querySelectorAll('form');

export {
  parentElement,
  housingTypeElement,
  housingPriceElement,
  housingGuestsElement,
  housingRoomsElement,
  housingFeatureElements,
  adFormElement,
  adFormInteractiveElements,
  mapFiltersFormElement,
  mapFiltersInteractiveElements,
  resetButtonElement,
  addressElement,
  offerAvatarChooserElement,
  offerAvatarPreviewElement,
  offerImageChooserElement,
  offerImagePreviewElement,
  roomNumberElement,
  capacityElement,
  timeInElement,
  timeOutElement,
  typeElement,
  priceElement,
  timeField,
  noUiSliderElement,
  formElements,
};
