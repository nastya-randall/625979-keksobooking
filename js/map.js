'use strict';

(function () {

  var MIN_Y = 130;
  var MAX_Y = 630;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var USER_PIN_WIDTH = 65;
  var USER_PIN_HEIGHT = 81;
  var ads = [];

  var map = document.querySelector('.map');

  var pinsContainer = document.querySelector('.map__pins');
  var filtersContainer = document.querySelector('.map__filters-container');
  var pinTemplate = document.querySelector('template')
      .content
      .querySelector('.map__pin');


  var userPin = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFieldsets = adForm.querySelectorAll('fieldset');
  var filters = map.querySelectorAll('[id^="housing-"]');

  var closePopup = function () {
    var popup = map.querySelector('.popup');
    if (popup !== null) {
      map.removeChild(popup);
    }
  };

  var onPopupEscPress = function (evt) {
    window.utils.isEscEvent(evt, closePopup);
  };

  var isPopup = function () {
    var popup = map.querySelector('.popup');
    if (popup !== null) {
      map.removeChild(popup);
    }
  };

  var openPopup = function (item) {
    isPopup();
    insertCards(item);
    map.querySelector('.popup__close').addEventListener('click', closePopup);
    document.addEventListener('keydown', onPopupEscPress);

  };

  // создание метки

  var renderPin = function (item) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = item.location.x - Math.floor(PIN_WIDTH / 2) + 'px';
    pinElement.style.top = item.location.y - PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = item.author.avatar;
    pinElement.querySelector('img').alt = item.offer.title;
    pinElement.addEventListener('click', function () {
      openPopup(item);
    });
    return pinElement;
  };

  var onLoad = function (data) {
    ads = data;
    insertPins(ads);
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style.zIndex = 100;
    node.style.color = '#ff6d51';
    node.style.position = 'absolute';
    node.style.left = '42%';
    node.style.top = '100px';
    node.style.fontSize = '22px';

    node.textContent = errorMessage;
    pinsContainer.insertAdjacentElement('afterbegin', node);

    setTimeout(function () {
      pinsContainer.removeChild(node);
    }, 5000);
  };


  // вставка меток на страницу

  var insertPins = function (array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(renderPin(array[i]));
    }
    pinsContainer.appendChild(fragment);
  };

  // вставка карточки на страницу

  var insertCards = function (item) {
    map.insertBefore(window.renderCard(item), filtersContainer);
  };


  // функция ввода страницы в активное состояние

  var activateSite = function () {
    map.classList.remove('map--faded');
    window.utils.disable(false, filters);
    window.utils.disable(false, adFieldsets);
    adForm.classList.remove('ad-form--disabled');
    window.backend.load(onLoad, onError);
    window.updateUserLocation();
  };

  userPin.addEventListener('mouseup', activateSite);

  // DRAGGING THE USER PIN

  var mainPin = map.querySelector('.map__pin--main');

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = window.utils.clamp(mainPin.offsetTop - shift.y, MIN_Y - USER_PIN_HEIGHT, MAX_Y) + 'px';
      mainPin.style.left = window.utils.clamp(mainPin.offsetLeft - shift.x, 0, map.offsetWidth - USER_PIN_WIDTH) + 'px';
      window.updateUserLocation();

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // удаление меток

  var removePins = function () {
    var pinsCol = map.querySelectorAll('.map__pin');
    for (var i = 1; i < pinsCol.length; i++) {
      pinsContainer.removeChild(pinsCol[i]);
    }
  };

  // обновление меток

  var updatePins = function () {
    var checkFeatures = function () {
      var selectedFeatures = map.querySelectorAll('input:checked');
      for (var i = 0; i < selectedFeatures.length; i++) {
        similarAds = similarAds.filter(function (ad) {
          return ad.offer.features.includes(selectedFeatures[i].value);
        });
      }
      return similarAds;
    };

    var similarAds = ads.filter(function (it) {
      return window.filters.checkType(it) && window.filters.checkPrice(it) && window.filters.checkRooms(it) && window.filters.checkGuests(it);
    });
    checkFeatures();

    removePins();
    isPopup();
    insertPins(similarAds);
  };

  var onFiltersChange = window.utils.debounce(updatePins);

  for (var i = 0; i < filters.length; i++) {
    filters[i].addEventListener('change', onFiltersChange);
  }

})();
