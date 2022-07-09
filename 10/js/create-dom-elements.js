import {
  getRussianTypesNames,
  getRoomEnding,
  getGuestEnding,
  getFeaturesAsDomElements,
  setPhotoSrc,
} from './utils.js';

const cardTemplateElement = document.querySelector('#card').content;
const parentElement = cardTemplateElement.querySelector('.popup');

const getSuccessMessage = () => {
  const successMessageTemplate = document.querySelector('#success').content;
  const successMessageTemplateElement = successMessageTemplate.querySelector('.success');
  const successMessageElement = successMessageTemplateElement.cloneNode(true);

  return successMessageElement;
};

const getErrorMessage = () => {
  const errorMessageTemplate = document.querySelector('#error').content;
  const errorMessageTemplateElement = errorMessageTemplate.querySelector('.error');
  const errorMessageElement = errorMessageTemplateElement.cloneNode(true);

  return errorMessageElement;
};

const createPopupsInDom = (offers) => {
  const offersContainerElement = document.createElement('div');
  offers.forEach((offerPost) => {
    const newOfferInDomElement = parentElement.cloneNode(true);
    const popupTitleElement = newOfferInDomElement.querySelector('.popup__title');
    const popupAddressElement = newOfferInDomElement.querySelector('.popup__text--address');
    const popupPriceElement = newOfferInDomElement.querySelector('.popup__text--price');
    const popupTypeElement = newOfferInDomElement.querySelector('.popup__type');
    const popupDescriptionElement = newOfferInDomElement.querySelector('.popup__description');
    const popupCapacityElement = newOfferInDomElement.querySelector('.popup__text--capacity');
    const popupTimeElement = newOfferInDomElement.querySelector('.popup__text--time');
    const popupAvatarElement = newOfferInDomElement.querySelector('.popup__avatar');
    const popupPhotoElement = newOfferInDomElement.querySelector('.popup__photos');
    const popupFeaturesContainerElement = newOfferInDomElement.querySelector('.popup__features');
    const popupFeaturesListElement = newOfferInDomElement.querySelectorAll('.popup__feature');

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
      popupPriceElement.firstChild.textContent = `${offerPost.offer.price} `;
    } else {
      popupPriceElement.firstChild.textContent = undefined;
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

    offersContainerElement.append(newOfferInDomElement);
  });
  return offersContainerElement;
};

export {
  createPopupsInDom,
  getGuestEnding,
  getRoomEnding,
  getSuccessMessage,
  getErrorMessage,
};
