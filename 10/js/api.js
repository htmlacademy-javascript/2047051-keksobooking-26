import {resetAllForms} from './validation.js';

const createEventListeners = (message) => {
  document.body.append(message);
  const onKeydown = (evt) => {
    if (evt.key === 'Escape') {
      message.remove();
    }
    document.removeEventListener('keydown', onKeydown);
  };
  const onClick = () => {
    message.remove();
    document.removeEventListener('keydown', onKeydown);
  };
  document.addEventListener('keydown', onKeydown);
  message.addEventListener('click', onClick);
  setTimeout(() => {
    message.remove();
    document.removeEventListener('keydown', onKeydown);
  }, 10000);
};

const getData = (address, popupConstructor, markerConstructor, errorMessageElement) => fetch(address)
  .then((response) => response.json())
  .then((data) => {
    const offerCards = popupConstructor(data);
    data.forEach((offer, index) => {
      markerConstructor(offerCards, offer, index);
    });
  })
  .catch(() => {
    errorMessageElement();
  });

const sendData = (address, succsess, errorr, data, setMapDefaultPosition) => {
  fetch(address,
    {
      method: 'POST',
      body: data,
    },
  ).then(() => {
    resetAllForms();
    setMapDefaultPosition();
    const message = succsess();
    document.body.append(message);
    createEventListeners(message);
  }).catch(() => {
    const message = errorr();
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
