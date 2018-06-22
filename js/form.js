'use strict';

(function () {

  var DEFAULT_X = 570;
  var DEFAULT_Y = 375;
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var adFieldsets = adForm.querySelectorAll('fieldset');
  var pinsContainer = document.querySelector('.map__pins');

  var mapFilters = map.querySelectorAll('[id^="housing-"]');

  // по умолчанию поля форм неактивны

  window.disable(true, mapFilters);
  window.disable(true, adFieldsets);

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

  var onSelectRoomChange = function () {
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
  };

  onSelectRoomChange();

  // проверка на валидность полей ввода

  var isInvalid = function (input) {
    if (input.checkValidity() === false) {
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
  resetButton.addEventListener('click', function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.disable(true, mapFilters);
    window.disable(true, adFieldsets);
    var pinsCol = map.querySelectorAll('.map__pin');
    for (var i = 1; i < pinsCol.length; i++) {
      pinsContainer.removeChild(pinsCol[i]);
    }
    map.querySelector('.map__pin--main').style.left = DEFAULT_X + 'px';
    map.querySelector('.map__pin--main').style.top = DEFAULT_Y + 'px';
    window.updateUserLocation();
  });
})();
