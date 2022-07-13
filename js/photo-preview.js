const offerAvatarChooserElement = document.querySelector('#avatar');
const offerAvatarPreviewElement = document.querySelector('.ad-form-header__preview').querySelector('img');
const offerImageChooserElement = document.querySelector('#images');
const offerImagePreviewElement = document.querySelector('.ad-form__photo');

offerAvatarChooserElement.addEventListener('change', () => {
  const offerAvatar = offerAvatarChooserElement.files[0];
  offerAvatarPreviewElement.src = URL.createObjectURL(offerAvatar);
});

offerImageChooserElement.addEventListener('change', () => {
  const img = document.createElement('img');
  img.style.width = '40px';
  img.style.height = '44px';
  img.style.paddingLeft = '5px';
  const offerImage = offerImageChooserElement.files[0];
  img.src = URL.createObjectURL(offerImage);
  offerImagePreviewElement.append(img);
});

export {
  offerAvatarPreviewElement as offerAvatarPreview,
  offerImagePreviewElement as offerImagePreview,
};
