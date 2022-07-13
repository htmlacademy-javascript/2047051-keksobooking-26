const Prices = {
  lowSetPoint: 10000,
  highSePoint: 50000,
};
const MAX_MARKERS_ON_MAP = 10;
const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingGuests = document.querySelector('#housing-guests');
const housingRooms = document.querySelector('#housing-rooms');
const housingFeatures = document.querySelector('#housing-features').querySelectorAll('input');

const testOfferPrice =(relativePrice, actualPrice) => {
  switch (relativePrice) {
    case 'low':
      return actualPrice < Prices.lowSetPoint ;
    case 'middle':
      return actualPrice >= Prices.lowSetPoint && actualPrice <= Prices.highSePoint;
    case 'high':
      return actualPrice > Prices.highSePoint;
    default:
      return true;
  }
};

const testOfferFeatures = (offer) => {
  let hasFilteredFeatures = false;
  let countCheckedFeatures = 0;
  let countFeaturesInOffer = 0;
  for (const featureCheckbox of housingFeatures) {
    if (featureCheckbox.checked) {
      hasFilteredFeatures = true;
    }
  }
  if (offer.offer.features) {
    for (const featureCheckbox of housingFeatures) {
      if (featureCheckbox.checked) {
        countCheckedFeatures++;
        const value = featureCheckbox.value;
        if (offer.offer.features.includes(value)) {
          countFeaturesInOffer++;
        }
      }
    }
  }
  if (!offer.offer.features && hasFilteredFeatures) {
    return false;
  }
  if (countCheckedFeatures===countFeaturesInOffer) {
    return true;
  }
  return false;
};

const testOfferType = (offer) => offer.offer.type === housingType.value || housingType.value === 'any';

const testOfferRooms = (offer) => offer.offer.rooms === Number(housingRooms.value) || housingRooms.value === 'any';

const testOfferGuests = (offer) => offer.offer.guests === Number(housingGuests.value) || housingGuests.value === 'any';

const showFilteredMarkers = (data, popupMaker, markerMaker) => {
  const filteredOffers = data.filter((offer) =>
    testOfferType(offer)
    && testOfferPrice(housingPrice.value, offer.offer.price)
    && testOfferRooms(offer)
    && testOfferGuests(offer)
    && testOfferFeatures(offer));
  const offerCards = popupMaker(filteredOffers);
  for (let i = 0; i < MAX_MARKERS_ON_MAP; i++) {
    if (filteredOffers[i]) {
      markerMaker(offerCards, filteredOffers[i], i);
    }
  }
};

export {
  showFilteredMarkers
};
