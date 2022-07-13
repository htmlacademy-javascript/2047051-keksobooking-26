const offerAvatarChooser = document.querySelector('#avatar');
const offerAvatarPreview = document.querySelector('.ad-form-header__preview').querySelector('img');
const offerImageChooser = document.querySelector('#images');
const offerImagePreview = document.querySelector('.ad-form__photo');

offerAvatarChooser.addEventListener('change', () => {
  const offerAvatar = offerAvatarChooser.files[0];
  offerAvatarPreview.src = URL.createObjectURL(offerAvatar);
});

offerImageChooser.addEventListener('change', () => {
  const img = document.createElement('img');
  img.style.width = '40px';
  img.style.height = '44px';
  img.style.paddingLeft = '5px';
  const offerImage = offerImageChooser.files[0];
  img.src = URL.createObjectURL(offerImage);
  offerImagePreview.append(img);
});

export {
  offerAvatarPreview,
  offerImagePreview,
};
