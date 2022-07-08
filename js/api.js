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

const sendData = (address, succsess, errorr, data, formElements) => {
  fetch(address,
    {
      method: 'POST',
      body: data,
    },
  ).then(() => {
    for (const formElement of formElements) {
      formElement.reset();
    }
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

export {
  getData,
  sendData
};
