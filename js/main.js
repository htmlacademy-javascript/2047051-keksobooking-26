const getRandomInteger = (scaleLow, scaleHigh) => {
  if (scaleLow === scaleHigh) {
    return scaleLow;
  } else if (scaleLow < 0 || scaleLow > scaleHigh) {
    throw new RangeError ('Диапазон меньше 0 или отрицательное начальное значание');
  }
  const range = scaleHigh - scaleLow;
  return Math.round(Math.random()*range+scaleLow);
};

getRandomInteger(0, 3);

const getRandomFloat = (scaleLow, scaleHigh, digitsAfterDecimalPoint = 0) => {
  const range = scaleHigh - scaleLow;
  if (scaleLow === scaleHigh) {
    return scaleLow;
  } else if (scaleLow < 0 || scaleLow > scaleHigh) {
    throw new RangeError ('Диапазон меньше 0 или отрицательное начальное значание');
  } else if (digitsAfterDecimalPoint < 0) {
    throw new RangeError ('Количество знаков после запятой не может быть меньше 0');
  } else if (digitsAfterDecimalPoint === 0) {
    return Math.round(Math.random()*range+scaleLow);
  }
  const floatRange = Math.random()*range+scaleLow;
  return Number(floatRange.toFixed(digitsAfterDecimalPoint));
};

getRandomFloat(5, 10, 3);
