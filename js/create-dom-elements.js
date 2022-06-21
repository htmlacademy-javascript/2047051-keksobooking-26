import {
  getRussianTypesNames,
  getFeaturesAsDomElements,
  setPhotoSrc
} from '/js/utils.js';

const cardTemplate = document.querySelector('#card').content;
const parentNode = cardTemplate.querySelector('.popup');
const offersFragment = document.createDocumentFragment();
const getRoomEnding = (count) => count > 1 ? 'комнаты' : 'комната';
const getGuestEnding = (count) => count > 1 ? 'гостей' : 'гостя';

const createCardsInDom = (offers) => {
  offers.forEach((offerPost) => {
    const newOfferinDom = parentNode.cloneNode(true);

    if (offerPost.offer.title === undefined) {
      newOfferinDom.querySelector('.popup__title').textContent = undefined;
      newOfferinDom.querySelector('.popup__title').classList.add('hidden');
    } else {
      newOfferinDom.querySelector('.popup__title').textContent = offerPost.offer.title;
    }

    if (offerPost.offer.address === undefined) {
      newOfferinDom.querySelector('.popup__text--address').textContent = undefined;
      newOfferinDom.querySelector('.popup__text--address').classList.add('hidden');
    } else {
      newOfferinDom.querySelector('.popup__text--address').textContent = offerPost.offer.address;
    }

    if (offerPost.offer.price === undefined) {
      newOfferinDom.querySelector('.popup__text--price').textContent = undefined;
      newOfferinDom.querySelector('.popup__text--price').classList.add('hidden');
    } else {
      newOfferinDom.querySelector('.popup__text--price').textContent = `${offerPost.offer.price} ₽/ночь`;
    }

    if (offerPost.offer.type === undefined) {
      newOfferinDom.querySelector('.popup__type').textContent = undefined;
      newOfferinDom.querySelector('.popup__type').classList.add('hidden');
    } else {
      newOfferinDom.querySelector('.popup__type').textContent = getRussianTypesNames(offerPost.offer.type);
    }

    if (offerPost.offer.description === undefined) {
      newOfferinDom.querySelector('.popup__description').textContent = undefined;
      newOfferinDom.querySelector('.popup__description').classList.add('hidden');
    } else {
      newOfferinDom.querySelector('.popup__description').textContent = offerPost.offer.description;
    }

    if (offerPost.offer.rooms === undefined && offerPost.offer.guests === undefined) {
      newOfferinDom.querySelector('.popup__text--capacity').textContent = undefined;
      newOfferinDom.querySelector('.popup__text--capacity').classList.add('hidden');
    } else if (offerPost.offer.rooms === undefined) {
      newOfferinDom.querySelector('.popup__text--capacity').textContent = `Жилье для ${offerPost.offer.guests} ${offerPost.offer.guests}`;
    } else if(offerPost.offer.guests === undefined) {
      newOfferinDom.querySelector('.popup__text--capacity').textContent = `${offerPost.offer.rooms} ${getRoomEnding(offerPost.offer.rooms)}`;
    } else {
      newOfferinDom.querySelector('.popup__text--capacity').textContent = `${offerPost.offer.rooms} ${getRoomEnding(offerPost.offer.rooms)} для ${offerPost.offer.guests} ${getGuestEnding(offerPost.offer.guests)}`;
    }

    if (offerPost.offer.checkin === undefined && offerPost.offer.checkout === undefined) {
      newOfferinDom.querySelector('.popup__text--time').textContent = undefined;
      newOfferinDom.querySelector('.popup__text--time').classList.add('hidden');
    } else if (offerPost.offer.checkin === undefined) {
      newOfferinDom.querySelector('.popup__text--time').textContent = `Выезд до ${offerPost.offer.checkout}`;
    } else if (offerPost.offer.checkout === undefined) {
      newOfferinDom.querySelector('.popup__text--time').textContent = `Заезд после ${offerPost.offer.checkin}`;
    } else {
      newOfferinDom.querySelector('.popup__text--time').textContent = `Заезд после ${offerPost.offer.checkin}, выезд до ${offerPost.offer.checkout}`;
    }

    if (offerPost.author.avatar === undefined) {
      newOfferinDom.querySelector('.popup__avatar').src = undefined;
      newOfferinDom.querySelector('.popup__avatar').classList.add('hidden');
    } else {
      newOfferinDom.querySelector('.popup__avatar').src = offerPost.author.avatar;
    }

    if (offerPost.offer.photos === undefined) {
      newOfferinDom.querySelector('.popup__photos').classList.add('hidden');
    } else {
      setPhotoSrc(newOfferinDom.querySelector('.popup__photos'),offerPost.offer.photos);
    }

    if (offerPost.offer.features === undefined) {
      newOfferinDom.querySelector('.popup__features').classList.add('hidden');
    } else {
      getFeaturesAsDomElements(newOfferinDom.querySelectorAll('.popup__feature'),offerPost.offer.features);
    }

    offersFragment.append(newOfferinDom);
  });
};
export {createCardsInDom,offersFragment};
