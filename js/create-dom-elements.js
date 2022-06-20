import {getRussianTypesNames,getFeaturesAsDomElements,setPhotoSrc} from '/js/utils.js';

const cardTemplate = document.querySelector('#card').content;
const parentNode = cardTemplate.querySelector('.popup');
const offersFragment = document.createDocumentFragment();

const createCardsInDom = (offers) => {
  offers.forEach((offerPost) => {
    const newOfferinDom = parentNode.cloneNode(true);
    const popupFeatures = newOfferinDom.querySelectorAll('.popup__feature');
    newOfferinDom.querySelector('.popup__title').textContent = offerPost.offer.title;
    newOfferinDom.querySelector('.popup__text--address').textContent = offerPost.offer.address;
    newOfferinDom.querySelector('.popup__text--price').textContent = `${offerPost.offer.price} ₽/ночь`;
    newOfferinDom.querySelector('.popup__text--capacity').textContent = `${offerPost.offer.rooms} комнаты для ${offerPost.offer.guests} гостей`;
    newOfferinDom.querySelector('.popup__text--time').textContent = `Заезд после ${offerPost.offer.checkin}, выезд до ${offerPost.offer.checkout}`;
    newOfferinDom.querySelector('.popup__description').textContent = offerPost.offer.description;
    newOfferinDom.querySelector('.popup__avatar').src = offerPost.author.avatar;
    setPhotoSrc(newOfferinDom.querySelector('.popup__photos'),offerPost.offer.photos);
    // newOfferinDom.querySelector('.popup__photos').textContent = offerPost.offer.photos;
    newOfferinDom.querySelector('.popup__type').textContent = getRussianTypesNames(offerPost.offer.type);
    getFeaturesAsDomElements(popupFeatures,offerPost.offer.features);
    offersFragment.append(newOfferinDom);
  });
};
export {createCardsInDom,offersFragment};
