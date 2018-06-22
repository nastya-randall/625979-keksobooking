'use strict';

// герерация объявлений

(function () {

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

  var features = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var checkinTime = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var photos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var locations = [];
  window.ads = [];

  var ADS_NUMBER = 8;
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 5;

  var MIN_Y = 130;
  var MAX_Y = 630;
  var map = document.querySelector('.map');

  var getRandom = function (array) {
    return Math.floor(Math.random() * array.length);
  };

  var getRandomInRange = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomArrayValue = function (array) {
    return array[Math.floor(Math.random() * array.length)];
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
        x: getRandomInRange(map.offsetLeft, map.offsetWidth),
        y: getRandomInRange(MIN_Y, MAX_Y)
      };
      locations.push(location);
    }
    return locations;
  };

  generateLocation();


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
      window.ads.push(ad);
    }
  };

  generateAds();
})();
