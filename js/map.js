'use strict';

var titles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var types = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var typeMap = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец'
};

var checkinTime = [
  '12:00',
  '13:00',
  '14:00'
];

var features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var MIN_X = 300;
var MAX_X = 900;
var MIN_Y = 130;
var MAX_Y = 630;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var USER_PIN_WIDTH = 65;
var USER_PIN_HEIGHT = 81;
var ads = [];
var ADS_NUMBER = 8;
var locations = [];

var map = document.querySelector('.map');

var pinsContainer = document.querySelector('.map__pins');
var filters = document.querySelector('.map__filters-container');
var pinTemplate = document.querySelector('template')
    .content
    .querySelector('.map__pin');

var cardTemplate = document.querySelector('template')
    .content
    .querySelector('.map__card');

var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomArrayValue = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandom = function (array) {
  return Math.floor(Math.random() * array.length);
};

// Fisher-Yates Shuffle

var shuffleArray = function (inputArray) {
  var array = inputArray.slice();
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;
  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

function getRandomShuffledArray(arr) {
  shuffleArray(arr);
  var counter = Math.floor(Math.random() * arr.length);
  return arr.slice(counter, arr.length);
}

// получение координат меток

var generateLocation = function () {
  for (var i = 0; i < ADS_NUMBER; i++) {
    var location = {
      x: getRandomInRange(MIN_X, MAX_X),
      y: getRandomInRange(MIN_Y, MAX_Y)
    };
    locations.push(location);
  }
  return locations;
};

generateLocation();

// герерация объявлений

var generateAds = function () {
  for (var i = 0; i < ADS_NUMBER; i++) {
    var titleRand = getRandom(titles);
    var ad = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: titles[titleRand],
        address: locations[i].x + ', ' + locations[i].y,
        price: getRandomInRange(MIN_PRICE, MAX_PRICE),
        type: getRandomArrayValue(types),
        rooms: getRandomInRange(MIN_ROOMS, MAX_ROOMS),
        guests: getRandomInRange(2, MAX_ROOMS),
        checkin: getRandomArrayValue(checkinTime),
        checkout: getRandomArrayValue(checkinTime),
        features: getRandomShuffledArray(features),
        description: '',
        photos: shuffleArray(photos)
      },
      location: {
        x: locations[i].x,
        y: locations[i].y
      }
    };
    titles.splice(titleRand, 1);
    ads.push(ad);
  }
};

generateAds();

// определение типа жилья

var getType = function (item) {
  return typeMap[item.offer.type] || item.offer.type;
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
  pinElement.addEventListener('mousedown', switchPopup);
  return pinElement;
};

var openPopup = function (item) {
  insertCards(item);
  map.querySelector('.popup__close').addEventListener('click', function () {
    map.removeChild(map.querySelector('.popup'));
  });
};

// Закрытие попапа при нажатии на другой пин

var switchPopup = function () {
  var popup = map.querySelector('.popup');
  if (popup !== null) {
    map.removeChild(popup);
  }
};

// вставка меток на страницу

var insertPins = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < ADS_NUMBER; i++) {
    fragment.appendChild(renderPin(ads[i]));
  }
  pinsContainer.appendChild(fragment);
};

var insertFeatures = function (container, array) {
  while (container.firstChild) {
    container.firstChild.remove();
  }
  for (var i = 0; i < array.length; i++) {
    var featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature');
    featureElement.classList.add('popup__feature--' + array[i]);
    container.appendChild(featureElement);
  }
};

var insertPhotos = function (container, template, array) {
  template.remove();
  for (var i = 0; i < array.length; i++) {
    var photoElement = template.cloneNode();
    photoElement.src = array[i];
    container.appendChild(photoElement);
  }
};

var renderCard = function (item) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__avatar').src = item.author.avatar;
  cardElement.querySelector('.popup__title').textContent = item.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = item.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = item.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = getType(item);
  cardElement.querySelector('.popup__text--capacity').textContent = item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после  ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = item.offer.description;

  var featuresContainer = cardElement.querySelector('.popup__features');
  insertFeatures(featuresContainer, item.offer.features);

  var photosContainer = cardElement.querySelector('.popup__photos');
  var photoTemplate = cardElement.querySelector('.popup__photo');
  insertPhotos(photosContainer, photoTemplate, item.offer.photos);

  return cardElement;
};

// вставка карточки на страницу

var insertCards = function (item) {
  map.insertBefore(renderCard(item), filters);
};

// сценарии взаимодействия пользователя с сайтом

var adForm = document.querySelector('.ad-form');
var adFieldsets = adForm.querySelectorAll('fieldset');
var userPin = map.querySelector('.map__pin--main');

var mapFilters = map.querySelectorAll('[id^="housing-"]');

// функция деактивации полей форм

var disable = function (value, form) {
  for (var i = 0; i < form.length; i++) {
    form[i].disabled = value;
  }
};

// по умолчанию поля форм неактивны

disable(true, mapFilters);
disable(true, adFieldsets);

// функция получения координат пина пользователя и запись их в поле адреса

var getUserPinAddress = function () {
  userPin = map.querySelector('.map__pin--main');
  userPin = {
    location: {
      x: Math.floor(parseInt(userPin.style.left, 10) + USER_PIN_WIDTH / 2),
      y: Math.floor(parseInt(userPin.style.top, 10) + USER_PIN_HEIGHT)
    }
  };

  adForm.querySelector('#address').value = userPin.location.x + ', ' + userPin.location.y;
};

// функция ввода страницы в активное состояние

var activateSite = function () {
  map.classList.remove('map--faded');
  disable(false, mapFilters);
  disable(false, adFieldsets);
  adForm.classList.remove('ad-form--disabled');
  insertPins();
  getUserPinAddress();
};

userPin.addEventListener('mouseup', activateSite);
