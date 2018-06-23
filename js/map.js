'use strict';

var ADS_NUMBER = 8;
var MIN_Y = 130;
var MAX_Y = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var USER_PIN_WIDTH = 65;
var USER_PIN_HEIGHT = 81;

var map = document.querySelector('.map');

var pinsContainer = document.querySelector('.map__pins');
var filters = document.querySelector('.map__filters-container');
var pinTemplate = document.querySelector('template')
    .content
    .querySelector('.map__pin');


var userPin = map.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFieldsets = adForm.querySelectorAll('fieldset');
var mapFilters = map.querySelectorAll('[id^="housing-"]');


var openPopup = function (item) {
  var popup = map.querySelector('.popup');
  if (popup !== null) {
    map.removeChild(popup);
  }
  insertCards(item);
  map.querySelector('.popup__close').addEventListener('click', function () {
    map.removeChild(map.querySelector('.popup'));
  });
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

// вставка меток на страницу

var insertPins = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < ADS_NUMBER; i++) {
    fragment.appendChild(renderPin(window.ads[i]));
  }
  pinsContainer.appendChild(fragment);
};

// вставка карточки на страницу

var insertCards = function (item) {
  map.insertBefore(window.renderCard(item), filters);
};

// функция ввода страницы в активное состояние

var activateSite = function () {
  map.classList.remove('map--faded');
  window.utils.disable(false, mapFilters);
  window.utils.disable(false, adFieldsets);
  adForm.classList.remove('ad-form--disabled');
  insertPins();
  window.updateUserLocation();
};

userPin.addEventListener('mouseup', activateSite);

// DRAGGING THE USER PIN

(function () {
  var mainPin = map.querySelector('.map__pin--main');

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var clamp = function (num, min, max) {
      return Math.min(Math.max(num, min), max);
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

      mainPin.style.top = clamp(mainPin.offsetTop - shift.y, MIN_Y - USER_PIN_HEIGHT, MAX_Y) + 'px';
      mainPin.style.left = clamp(mainPin.offsetLeft - shift.x, 0, map.offsetWidth - USER_PIN_WIDTH) + 'px';
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

})();
