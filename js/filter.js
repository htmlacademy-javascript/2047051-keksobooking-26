import {
  MAX_MARKERS_ON_MAP,
  Prices,
} from './values.js';

import {
  housingTypeElement,
  housingPriceElement,
  housingGuestsElement,
  housingRoomsElement,
  housingFeatureElements,
} from './dom-elements.js';

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
  for (const featureCheckbox of housingFeatureElements) {
    if (featureCheckbox.checked) {
      hasFilteredFeatures = true;
    }
  }
  if (offer.offer.features) {
    for (const featureCheckbox of housingFeatureElements) {
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
  return countCheckedFeatures === countFeaturesInOffer;
};

const testOfferType = (offer) => offer.offer.type === housingTypeElement.value || housingTypeElement.value === 'any';

const testOfferRooms = (offer) => offer.offer.rooms === Number(housingRoomsElement.value) || housingRoomsElement.value === 'any';

const testOfferGuests = (offer) => offer.offer.guests === Number(housingGuestsElement.value) || housingGuestsElement.value === 'any';

const showFilteredMarkers = (data, popupMaker, markerMaker) => {
  const filteredOffers = data.filter((offer) =>
    testOfferType(offer)
    && testOfferPrice(housingPriceElement.value, offer.offer.price)
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
