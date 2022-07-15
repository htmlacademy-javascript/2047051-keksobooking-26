import {
  MAX_MARKERS_ON_MAP,
  PriceScale,
} from './values.js';

import {
  housingTypeElement,
  housingPriceElement,
  housingGuestsElement,
  housingRoomsElement,
  housingFeatureElements,
} from './dom-elements.js';

const filterOfferPrice =(relativePrice, actualPrice) => {
  switch (relativePrice) {
    case 'low':
      return actualPrice < PriceScale.LOW_SETPOINT ;
    case 'middle':
      return actualPrice >= PriceScale.LOW_SETPOINT && actualPrice <= PriceScale.HIGH_SETPOINT;
    case 'high':
      return actualPrice > PriceScale.HIGH_SETPOINT;
    default:
      return true;
  }
};

const filterOfferFeatures = (offerPost) => {
  let hasFilteredFeatures = false;
  let countCheckedFeatures = 0;
  let countFeaturesInOffer = 0;
  for (const featureCheckbox of housingFeatureElements) {
    if (featureCheckbox.checked) {
      hasFilteredFeatures = true;
    }
  }
  if (offerPost.offer.features) {
    for (const featureCheckbox of housingFeatureElements) {
      if (featureCheckbox.checked) {
        countCheckedFeatures++;
        const value = featureCheckbox.value;
        if (offerPost.offer.features.includes(value)) {
          countFeaturesInOffer++;
        }
      }
    }
  }
  if (!offerPost.offer.features && hasFilteredFeatures) {
    return false;
  }
  return countCheckedFeatures === countFeaturesInOffer;
};

const filterOfferType = (offerPost) => offerPost.offer.type === housingTypeElement.value || housingTypeElement.value === 'any';

const filterOfferRooms = (offerPost) => offerPost.offer.rooms === Number(housingRoomsElement.value) || housingRoomsElement.value === 'any';

const filterOfferGuests = (offerPost) => offerPost.offer.guests === Number(housingGuestsElement.value) || housingGuestsElement.value === 'any';

const showFilteredMarkers = (data, popupMaker, markerMaker) => {
  const filteredOffers = data.filter((offerPost) =>
    filterOfferType(offerPost)
    && filterOfferPrice(housingPriceElement.value, offerPost.offer.price)
    && filterOfferRooms(offerPost)
    && filterOfferGuests(offerPost)
    && filterOfferFeatures(offerPost));
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
