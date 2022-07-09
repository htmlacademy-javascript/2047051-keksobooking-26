import {resetAllForms} from './validation.js';

const TIME_TO_DISPLAY_MESSAGE = 10000;

const createEventListeners = (message) => {
  document.body.append(message);
  const onDocumentKeydown = (evt) => {
    if (evt.key === 'Escape') {
      message.remove();
    }
    document.removeEventListener('keydown', onDocumentKeydown);
  };
  const onDocumentClick = () => {
    message.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  };
  document.addEventListener('keydown', onDocumentKeydown);
  message.addEventListener('click', onDocumentClick);
  setTimeout(() => {
    message.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  }, TIME_TO_DISPLAY_MESSAGE);
};

const getData = (address, getPopupElements, getMarkersOnMap, errorMessageElement) => fetch(address)
  .then((response) => response.json())
  .then((data) => {
    const offerCards = getPopupElements(data);
    data.forEach((offer, index) => {
      getMarkersOnMap(offerCards, offer, index);
    });
  })
  .catch(() => {
    errorMessageElement();
  });

const sendData = (address, getSuccsessMessage, getErrorMessage, data, setMapDefaultPosition) => {
  fetch(address,
    {
      method: 'POST',
      body: data,
    },
  ).then(() => {
    resetAllForms();
    setMapDefaultPosition();
    const message = getSuccsessMessage();
    document.body.append(message);
    createEventListeners(message);
  }).catch(() => {
    const message = getErrorMessage();
    const errorButton = message.querySelector('.error__button');
    errorButton.addEventListener('click', () => {
      message.remove();
    });
    document.body.append(message);
    createEventListeners(message);
  });
};

export {
  getData,
  sendData
};
