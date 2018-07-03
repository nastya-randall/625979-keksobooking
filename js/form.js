'use strict';

(function () {

  var DEFAULT_X = 570;
  var DEFAULT_Y = 375;
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var adFieldsets = adForm.querySelectorAll('fieldset');
  var pinsContainer = document.querySelector('.map__pins');
  var mapFilters = map.querySelectorAll('[id^="housing-"]');
  var successPopup = document.querySelector('.success');

  // по умолчанию поля форм неактивны

  window.utils.disable(true, mapFilters);
  window.utils.disable(true, adFieldsets);

  // ВАЛИДАЦИЯ ФОРМ

  // настройка типа жилья и минимальной цены

  var priceMap = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var selectType = adForm.querySelector('#type');
  var inputPrice = adForm.querySelector('#price');

  var getMinPrice = function () {
    return priceMap[selectType.value];
  };

  selectType.addEventListener('change', function () {
    inputPrice.placeholder = getMinPrice();
    inputPrice.setAttribute('min', getMinPrice());
  });

  // Время заезда и выезда

  var selectTimein = adForm.querySelector('#timein');
  var selectTimeout = adForm.querySelector('#timeout');

  var syncTimein = function () {
    selectTimeout.value = selectTimein.value;
  };

  var syncTimeout = function () {
    selectTimein.value = selectTimeout.value;
  };

  var onTimeChange = function () {
    selectTimein.addEventListener('change', syncTimein);
    selectTimeout.addEventListener('change', syncTimeout);
  };

  onTimeChange();

  // Количество комнат и гстей

  var selectRoom = adForm.querySelector('#room_number');
  var selectCapacity = adForm.querySelector('#capacity');

  var disableOptions = function (index) {
    for (var i = 0; i < selectCapacity.children.length; i++) {
      selectCapacity.children[i].disabled = true;
    }

    selectCapacity.selectedIndex = index;
  };

  var enableOptions = function (min, max) {
    for (var i = min; i <= max; i++) {
      selectCapacity.children[i].disabled = false;
    }
  };

  selectRoom.addEventListener('change', function (evt) {
    if (evt.target.selectedIndex === 3) {
      disableOptions(3);
      enableOptions(3, 3);
    }

    for (var i = 0; i < selectRoom.children.length - 1; i++) {
      if (evt.target.selectedIndex === i) {
        disableOptions(i);
        enableOptions(0, i);
      }
    }
  });

  var deactivateSite = function () {
    map.classList.add('map--faded');
    adForm.reset();
    adForm.classList.add('ad-form--disabled');
    window.utils.disable(true, mapFilters);
    window.utils.disable(true, adFieldsets);
    window.resetPreviews();
    var pinsCol = map.querySelectorAll('.map__pin');
    for (var i = 1; i < pinsCol.length; i++) {
      pinsContainer.removeChild(pinsCol[i]);
    }
    map.querySelector('.map__pin--main').style.left = DEFAULT_X + 'px';
    map.querySelector('.map__pin--main').style.top = DEFAULT_Y + 'px';
    window.updateUserLocation();
    window.scrollTo(0, 0);
  };

  var closePopup = function () {
    successPopup.classList.add('hidden');
  };

  var onPopupEscPress = function (evt) {
    window.utils.isEscEvent(evt, closePopup);
  };


  var onLoad = function () {
    deactivateSite();
    successPopup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style.color = '#ff6d51';
    node.style.position = 'absolute';
    node.style.bottom = 0;
    node.style.left = '45%';
    node.style.fontSize = '22px';

    node.textContent = errorMessage;
    adForm.insertAdjacentElement('beforeend', node);

    setTimeout(function () {
      adForm.removeChild(node);
    }, 5000);
  };

  adForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(adForm), onLoad, onError);
    evt.preventDefault();
  });

  successPopup.addEventListener('click', closePopup);

  // проверка на валидность полей ввода

  var isInvalid = function (input) {
    if (!input.checkValidity()) {
      input.style.boxShadow = '0 0 2px 2px #ff6547';
    }
  };

  var onInputBlur = function (input) {
    input.addEventListener('blur', function () {
      input.style.boxShadow = 'none';
    });
  };

  adForm.querySelector('.ad-form__submit').addEventListener('click', function () {
    isInvalid(adForm.querySelector('#title'));
    isInvalid(adForm.querySelector('#price'));
  });

  onInputBlur(adForm.querySelector('#title'));
  onInputBlur(adForm.querySelector('#price'));

  // reset the page //

  var resetButton = adForm.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', deactivateSite);
})();
