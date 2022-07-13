const offerAvatarChooser = document.querySelector('#avatar');
const offerAvatarPreview = document.querySelector('.ad-form-header__preview').querySelector('img');
const offerImageChooser = document.querySelector('#images');
const offerImagePreview = document.querySelector('.ad-form__photo').children;

offerAvatarChooser.addEventListener('change', () => {
  const avatar = offerAvatarChooser.files[0];
  offerAvatarPreview.src = URL.createObjectURL(avatar);
});
