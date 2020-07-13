'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpeg', 'png', 'jpg'];
  var IMAGE_SIZES = {
    width: 140,
    height: 90
  };

  var avatarChooser = document.querySelector('.ad-form-header__input');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  var photoChooser = document.querySelector('.ad-form__input');
  var previewPhoto = document.querySelector('.ad-form__photo');

  var onChooserClick = function (evt) {
    var file = evt.target.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (evt.target.id === 'avatar') {
          previewAvatar.src = reader.result;
        } else {
          var photo = document.createElement('img');
          photo.src = reader.result;
          photo.width = IMAGE_SIZES.width;
          photo.height = IMAGE_SIZES.height;
          previewPhoto.appendChild(photo);
        }
      });

      reader.readAsDataURL(file);
    }
  };

  avatarChooser.addEventListener('change', onChooserClick);
  photoChooser.addEventListener('change', onChooserClick);
})();
