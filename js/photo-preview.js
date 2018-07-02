'use strict';

(function () {
  var IMAGE_WIDTH = 70;
  var IMAGE_HEIGHT = 70;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var avatarChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview').querySelector('img');

  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  var photosChooser = document.querySelector('#images');
  var photosPreview = document.querySelector('.ad-form__photo');
  var photosContainer = document.querySelector('.ad-form__photo-container');

  photosChooser.addEventListener('change', function () {
    for (var i = 0; i < photosChooser.files.length; i++) {
      var file = photosChooser.files[i];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function (evt) {
          var photoWrapper = document.createElement('div');
          photoWrapper.classList.add('ad-form__photo');
          var photo = document.createElement('img');
          photo.src = evt.target.result;
          photo.width = IMAGE_WIDTH;
          photo.height = IMAGE_HEIGHT;
          photoWrapper.appendChild(photo);
          photosContainer.insertBefore(photoWrapper, photosPreview);
        });

        reader.readAsDataURL(file);
      }
    }
  });

  window.resetPreviews = function () {
    avatarPreview.src = 'img/muffin-grey.svg';

    var photosCol = document.querySelectorAll('.ad-form__photo');
    for (var i = 0; i < photosCol.length - 1; i++) {
      photosContainer.removeChild(photosCol[i]);
    }
  };

})();
