import {
  offerAvatarChooserElement,
  offerAvatarPreviewElement,
  offerImageChooserElement,
  offerImagePreviewElement,
} from './dom-elements.js';

import {IMAGE_FILE_TYPES} from './values.js';

offerAvatarChooserElement.addEventListener('change', () => {
  const offerAvatar = offerAvatarChooserElement.files[0];
  const offerAvatarName = offerAvatar.name.toLowerCase();
  const matchesFileType = IMAGE_FILE_TYPES.some((type) => offerAvatarName.endsWith(type));
  if (matchesFileType) {
    offerAvatarPreviewElement.src = URL.createObjectURL(offerAvatar);
  }
});

offerImageChooserElement.addEventListener('change', () => {
  const offerImage = offerImageChooserElement.files[0];
  const offerImageName = offerImage.name.toLowerCase();
  const matchesFileType = IMAGE_FILE_TYPES.some((type) => offerImageName.endsWith(type));
  if (matchesFileType) {
    const img = document.createElement('img');
    img.classList.add('offer__image');
    img.src = URL.createObjectURL(offerImage);
    offerImagePreviewElement.append(img);
  }
});
