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
var ads = [];
var ADS_NUMBER = 8;
var authors = [];
var locations = [];
var offers = [];

var map = document.querySelector('.map');

var pins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('template')
    .content
    .querySelector('.map__pin');


var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomArrayValue = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandom = function (array) {
  return Math.floor(Math.random() * array.length);
};

var shuffleArray = function (array) { // Fisher-Yates Shuffle
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

var renderAuthors = function () {
  for (var i = 0; i < ADS_NUMBER; i++) {
    var avatarRand = getRandom(avatars);
    var imgAddress = 'img/avatars/user' + avatars[avatarRand] + '.png';
    var author = {
      avatar: imgAddress
    };
    avatars.splice(avatarRand, 1);
    authors.push(author);
  }
};

renderAuthors();
console.log(authors);

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

var renderAds = function () {
  for (var i = 0; i < ADS_NUMBER; i++) {
    var titleRand = getRandom(titles);
    var ad = {
      author: {
        avatar: authors[i].avatar
      },
      offer: {
        title: titles[titleRand],
        address: locations[i].x + ', ' + locations[i].y,
        price: getRandomInRange(MIN_PRICE, MAX_PRICE),
        type: getRandomArrayValue(types),
        rooms: getRandomInRange(MIN_ROOMS, MAX_ROOMS),
        guests: getRandomInRange(MIN_ROOMS, MAX_ROOMS),
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

renderAds();
console.log(ads);

var renderPin = function (item) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = item.location.x + 'px';
  pinElement.style.top = item.location.y + 'px';
  pinElement.src = authors.avatar;
  return pinElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < ADS_NUMBER; i++) {
  fragment.appendChild(renderPin(ads[i]));
}

pins.appendChild(fragment);
map.classList.remove('map--faded');
