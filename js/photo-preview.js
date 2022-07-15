import {
  offerAvatarChooserElement,
  offerAvatarPreviewElement,
  offerImageChooserElement,
  offerImagePreviewElement,
} from './dom-elements.js';

offerAvatarChooserElement.addEventListener('change', () => {
  const offerAvatar = offerAvatarChooserElement.files[0];
  offerAvatarPreviewElement.src = URL.createObjectURL(offerAvatar);
});

offerImageChooserElement.addEventListener('change', () => {
  const img = document.createElement('img');
  img.style.width = '40px';
  img.style.height = '40px';
  img.style.paddingLeft = '5px';
  const offerImage = offerImageChooserElement.files[0];
  img.src = URL.createObjectURL(offerImage);
  offerImagePreviewElement.append(img);
});
