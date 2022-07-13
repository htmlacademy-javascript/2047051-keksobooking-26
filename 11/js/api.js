const getData = (address, errorMessageElement) => fetch(address)
  .then((response) => response.json())
  .catch(() => {
    errorMessageElement();
  });

const sendData = (address, data) => fetch(address,
  {
    method: 'POST',
    body: data,
  }
);

export {
  getData,
  sendData
};
