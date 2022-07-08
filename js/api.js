import {createCommonMarker} from './map-markers.js';

import {createCardsInDom} from './create-dom-elements.js';

import {displayOffersLoadErrorMessage} from './utils.js';

const getData = (address) => fetch(address)
  .then((response) => response.json())
  .then((data) => {
    const offerCards = createCardsInDom(data);
    data.forEach((offer, index) => {
      createCommonMarker(offerCards, offer, index);
    });
  })
  .catch(() => {
    displayOffersLoadErrorMessage();
  });

const sendData = (address, succsess, errorr, data, evt) => {
  fetch(address,
    {
      method: 'POST',
      body: data,
    },
  ).then(() => {
    evt.target.reset();
    const message = succsess();
    document.body.append(message);
    document.addEventListener('keydown', (keyEvt) => {
      if (keyEvt.key === 'Escape') {
        message.remove();
      }
      setTimeout(() => message.remove(), 5000);
    });
  }).catch(() => {
    const message = errorr();
    document.body.append(message);
    document.addEventListener('keydown', (keyEvt) => {
      if (keyEvt.key === 'Escape') {
        message.remove();
      }
      setTimeout(() => message.remove(), 5000);
    });
  });
};

getData('https://26.javascript.pages.academy/keksobooking/data');

export {sendData};
