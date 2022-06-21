import {
  getRussianTypesNames,
  getFeaturesAsDomElements,
  setPhotoSrc
} from './utils.js';

const cardTemplateElement = document.querySelector('#card').content;
const parentElement = cardTemplateElement.querySelector('.popup');
const offersFragmentElement = document.createDocumentFragment();
const getRoomEnding = (count) => count > 1 ? 'комнаты' : 'комната';
const getGuestEnding = (count) => count > 1 ? 'гостей' : 'гостя';

const createCardsInDom = (offers) => {
  offers.forEach((offerPost) => {
    const newOfferInDom = parentElement.cloneNode(true);
    const popupTitleElement = newOfferInDom.querySelector('.popup__title');
    const popupAddressElement = newOfferInDom.querySelector('.popup__text--address');
    const popupPriceElement = newOfferInDom.querySelector('.popup__text--price');
    const popupTypeElement = newOfferInDom.querySelector('.popup__type');
    const popupDescriptionElement = newOfferInDom.querySelector('.popup__description');
    const popupCapacityElement = newOfferInDom.querySelector('.popup__text--capacity');
    const popupTimeElement = newOfferInDom.querySelector('.popup__text--time');
    const popupAvatarElement = newOfferInDom.querySelector('.popup__avatar');
    const popupPhotoElement = newOfferInDom.querySelector('.popup__photos');
    const popupFeaturesContainerElement = newOfferInDom.querySelector('.popup__features');
    const popupFeaturesListElement = newOfferInDom.querySelectorAll('.popup__feature');

    if (offerPost.offer.title) {
      popupTitleElement.textContent = offerPost.offer.title;
    } else {
      popupTitleElement.textContent = undefined;
      popupTitleElement.classList.add('hidden');
    }

    if (offerPost.offer.address) {
      popupAddressElement.textContent = offerPost.offer.address;
    } else {
      popupAddressElement.textContent = undefined;
      popupAddressElement.classList.add('hidden');
    }

    if (offerPost.offer.price) {
      popupPriceElement.textContent = `${offerPost.offer.price} ₽/ночь`;
    } else {
      popupPriceElement.textContent = undefined;
      popupPriceElement.classList.add('hidden');
    }

    if (offerPost.offer.type) {
      popupTypeElement.textContent = getRussianTypesNames(offerPost.offer.type);
    } else {
      popupTypeElement.textContent = undefined;
      popupTypeElement.classList.add('hidden');
    }

    if (offerPost.offer.description) {
      popupDescriptionElement.textContent = offerPost.offer.description;
    } else {
      popupDescriptionElement.textContent = undefined;
      popupDescriptionElement.classList.add('hidden');
    }

    if (offerPost.offer.rooms && offerPost.offer.guests) {
      popupCapacityElement.textContent = `${offerPost.offer.rooms} ${getRoomEnding(offerPost.offer.rooms)} для ${offerPost.offer.guests} ${getGuestEnding(offerPost.offer.guests)}`;
    } else if (offerPost.offer.rooms) {
      popupCapacityElement.textContent = `${offerPost.offer.rooms} ${getRoomEnding(offerPost.offer.rooms)}`;
    } else if(offerPost.offer.guests) {
      popupCapacityElement.textContent = `Жилье для ${offerPost.offer.guests} ${offerPost.offer.guests}`;
    } else {
      popupCapacityElement.textContent = undefined;
      popupCapacityElement.classList.add('hidden');
    }

    if (offerPost.offer.checkin && offerPost.offer.checkout) {
      popupTimeElement.textContent = `Заезд после ${offerPost.offer.checkin}, выезд до ${offerPost.offer.checkout}`;
    } else if (offerPost.offer.checkin) {
      popupTimeElement.textContent = `Заезд после ${offerPost.offer.checkin}`;
    } else if (offerPost.offer.checkout) {
      popupTimeElement.textContent = `Выезд до ${offerPost.offer.checkout}`;
    } else {
      popupTimeElement.textContent = undefined;
      popupTimeElement.classList.add('hidden');
    }

    if (offerPost.author.avatar) {
      popupAvatarElement.src = offerPost.author.avatar;
    } else {
      popupAvatarElement.src = undefined;
      popupAvatarElement.classList.add('hidden');
    }

    if (offerPost.offer.photos && offerPost.offer.photos.length > 0) {
      setPhotoSrc(popupPhotoElement,offerPost.offer.photos);
    } else {
      popupPhotoElement.classList.add('hidden');
    }

    if (offerPost.offer.features && offerPost.offer.features.length > 0) {
      getFeaturesAsDomElements(popupFeaturesListElement,offerPost.offer.features);
    } else {
      popupFeaturesContainerElement.classList.add('hidden');
    }

    offersFragmentElement.append(newOfferInDom);
  });
};
export {createCardsInDom,offersFragmentElement};
