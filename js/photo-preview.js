'use strict';

(function () {
  var IMAGE_WIDTH = 70;
  var IMAGE_HEIGHT = 70;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var avatarChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview').querySelector('img');

  var checkFileFormat = function (fileName, formats) {
    return formats.some(function (it) {
      return fileName.endsWith(it);
    });
  };

  var showPreview = function (el, file) {
    var reader = new FileReader();

    reader.addEventListener('load', function (evt) {
      el.src = evt.target.result;
    });

    reader.readAsDataURL(file);
  };

  avatarChooser.addEventListener('change', function () {
    if (avatarChooser.files.length <= 0) {
      return;
    }

    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();

    if (!checkFileFormat(fileName, FILE_TYPES)) {
      return;
    }

    showPreview(avatarPreview, file);
  });

  var photosChooser = document.querySelector('#images');
  var photosPreview = document.querySelector('.ad-form__photo');
  var photosContainer = document.querySelector('.ad-form__photo-container');

  photosChooser.addEventListener('change', function () {
    for (var i = 0; i < photosChooser.files.length; i++) {
      var file = photosChooser.files[i];
      var fileName = file.name.toLowerCase();

      if (!checkFileFormat(fileName, FILE_TYPES)) {
        continue;
      }

      var photoWrapper = document.createElement('div');
      photoWrapper.classList.add('ad-form__photo');
      var photo = document.createElement('img');
      photo.width = IMAGE_WIDTH;
      photo.height = IMAGE_HEIGHT;
      photoWrapper.appendChild(photo);
      photosContainer.insertBefore(photoWrapper, photosPreview);

      showPreview(photo, file);
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
