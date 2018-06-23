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


  // получение координат меток

  var generateLocation = function () {
    for (var i = 0; i < ADS_NUMBER; i++) {
      var location = {
        x: window.utils.getRandomInRange(map.offsetLeft, map.offsetWidth),
        y: window.utils.getRandomInRange(MIN_Y, MAX_Y)
      };
      locations.push(location);
    }
    return locations;
  };

  generateLocation();


  var generateAds = function () {
    for (var i = 0; i < ADS_NUMBER; i++) {
      var titleRand = window.utils.getRandom(titles);
      var ad = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: titles[titleRand],
          address: locations[i].x + ', ' + locations[i].y,
          price: window.utils.getRandomInRange(MIN_PRICE, MAX_PRICE),
          type: window.utils.getRandomArrayValue(types),
          rooms: window.utils.getRandomInRange(MIN_ROOMS, MAX_ROOMS),
          guests: window.utils.getRandomInRange(2, MAX_ROOMS),
          checkin: window.utils.getRandomArrayValue(checkinTime),
          checkout: window.utils.getRandomArrayValue(checkinTime),
          features: window.utils.getRandomShuffledArray(features),
          description: '',
          photos: window.utils.shuffleArray(photos)
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
