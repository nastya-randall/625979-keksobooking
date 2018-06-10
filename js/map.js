'use strict';

var avatars = ['01', '02', '03', '04', '05', '06', '07', '08'];
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
var ads = [];
var ADS_NUMBER = 8;
var locations = [];

var map = document.querySelector('.map');

var pins = document.querySelector('.map__pins');
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

var shuffleArray = function (array) {
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

var renderLocation = function () {
  for (var i = 0; i < ADS_NUMBER; i++) {
    var location = {
      x: getRandomInRange(MIN_X, MAX_X),
      y: getRandomInRange(MIN_Y, MAX_Y)
    };
    locations.push(location);
  }
  return locations;
};

renderLocation();

// герерация объявлений

var renderAds = function () {
  for (var i = 0; i < ADS_NUMBER; i++) {
    var avatarRand = getRandom(avatars);
    var titleRand = getRandom(titles);
    var ad = {
      author: {
        avatar: 'img/avatars/user' + avatars[avatarRand] + '.png'
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
    avatars.splice(avatarRand, 1);
    titles.splice(titleRand, 1);
    ads.push(ad);
  }
};

renderAds();
console.log(ads);

// определение типа жилья

var getType = function (item) {
  var typeText;
  if (item.offer.type === 'flat') {
    return 'Квартира';
  } else if (item.offer.type === 'bungalo') {
    return 'Бунгало';
  } else if (item.offer.type === 'house') {
    return 'Дом';
  } else if (item.offer.type === 'palace') {
    return 'Дворец';
  }
  return typeText;
};

// создание метки

var renderPin = function (item) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = item.location.x - Math.floor(PIN_WIDTH / 2) + 'px';
  pinElement.style.top = item.location.y - PIN_HEIGHT + 'px';
  pinElement.querySelector('img').src = item.author.avatar;
  pinElement.querySelector('img').alt = item.offer.title;
  return pinElement;
};

// вставка меток на страницу

var addPins = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < ADS_NUMBER; i++) {
    fragment.appendChild(renderPin(ads[i]));
  }
  pins.appendChild(fragment);
};

addPins();

// жалкие мои попытки хоть что.то сделать с features

var featuresList = cardTemplate.querySelector('.popup__features');
var renderFeatures = function (item) {
  for (var i = 0; i < featuresList.children.length; i++) {
    if (!featuresList.children[i].classList.contains(item.features)) {
      featuresList.removeChild(featuresList.childNodes[i]);
    }
  }
  return featuresList.children;
};

renderFeatures(ads[0]);
console.log(featuresList.children);

// и такие же жалкие заставить photos работать, но ниче не работает

var photosContainer = cardTemplate.querySelector('.popup__photos');

var renderPhotos = function (item) {
  var photoElement = cardTemplate.querySelector('.popup__photo').cloneNode;
  photoElement.src = item.offer.photos;
  return photoElement;
};

// герерация карточки объявления

var renderCard = function (item) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = item.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = item.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = item.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = getType(item);
  cardElement.querySelector('.popup__text--capacity').textContent = item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после  ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = item.offer.description;
  renderFeatures(item);

  return cardElement;
};

// вставка карточки на страницу

var addCards = function () {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(renderCard(ads[0]));
  map.insertBefore(fragment, filters);
};

addCards();

map.classList.remove('map--faded');
