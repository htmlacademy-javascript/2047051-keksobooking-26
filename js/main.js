const getRandomInteger = (scaleLow, scaleHigh) => {
  if (scaleLow === scaleHigh) {
    return scaleLow;
  } else if (scaleLow < 0 || scaleLow > scaleHigh) {
    return 'Введите корректный диапазон';
  }
  const range = scaleHigh - scaleLow;
  return Math.round(Math.random()*range+scaleLow);
};

getRandomInteger(5, 10);

const getRandomFloat = (scaleLow, scaleHigh, digitsAfterDecimalPoint) => {
  const range = scaleHigh - scaleLow;
  if (scaleLow === scaleHigh) {
    return scaleLow;
  } else if (scaleLow < 0 || scaleLow > scaleHigh) {
    return 'Введите корректный диапазон';
  } else if (digitsAfterDecimalPoint < 0) {
    return 'Количество знаков не может быть меньше 0';
  } else if (digitsAfterDecimalPoint === undefined) {
    return Math.round(Math.random()*range+scaleLow);
  }
  const floatRange = Math.random()*range+scaleLow;
  return floatRange.toPrecision(digitsAfterDecimalPoint+1);
};

getRandomFloat(5, 10, 4);
