'use strict';
(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var HOUSE_PHOTO_WIDTH = 70;
  var HOUSE_PHOTO_HEIGHT = 70;

  var avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photoFileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoPreview = document.querySelector('.ad-form__photo');
  var defaultAvatar = avatarPreview.src;

  var changeUserPhoto = function (result) {
    avatarPreview.src = result;
  };

  var changeTypePhoto = function (result) {
    var newPhoto = document.createElement('img');
    newPhoto.src = result;
    newPhoto.width = HOUSE_PHOTO_WIDTH;
    newPhoto.height = HOUSE_PHOTO_HEIGHT;
    photoPreview.appendChild(newPhoto);
  };

  var loadPreview = function (element, action) {
    var file = element.files[0];
    if (file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (item) {
        return fileName.endsWith(item);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function (evt) {
          action(evt.target.result);
        });

        reader.readAsDataURL(file);
      }
    }
  };

  var onAvatarPhotoChange = function () {
    loadPreview(avatarFileChooser, changeUserPhoto);
  };

  var onTypePhotoChange = function () {
    loadPreview(photoFileChooser, changeTypePhoto);
  };

  avatarFileChooser.addEventListener('change', onAvatarPhotoChange);
  photoFileChooser.addEventListener('change', onTypePhotoChange);

  var removeImage = function () {
    avatarPreview.src = defaultAvatar;
    var typePhotos = photoPreview.querySelectorAll('img');
    if (typePhotos) {
      typePhotos.forEach(function (item) {
        item.remove();
      });
    }
  };

  window.photos = {
    removeImage: removeImage
  };
})();
