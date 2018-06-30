'use strict';

// Фильтрация объявлений ///

(function () {

  var map = document.querySelector('.map');

  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;

  var typeFilter = map.querySelector('#housing-type');

  var priceFilter = map.querySelector('#housing-price');

  var roomFilter = map.querySelector('#housing-rooms');

  var guestsFilter = map.querySelector('#housing-guests');


  window.filters = {

    checkType: function (ad) {
      if (typeFilter.value === 'any') {
        return ad.offer.type;
      }
      return ad.offer.type === typeFilter.value;
    },

    checkPrice: function (ad) {
      switch (priceFilter.value) {
        case 'any':
          return ad.offer.price;
        case 'low':
          return ad.offer.price < MIN_PRICE;
        case 'high':
          return ad.offer.price > MAX_PRICE;
        case 'middle':
          return (ad.offer.price >= MIN_PRICE && ad.offer.price <= MAX_PRICE);
        default:
          return ad.offer.price === priceFilter.value;
      }
    },

    checkRooms: function (ad) {
      if (roomFilter.value === 'any') {
        return ad.offer.rooms;
      }
      return ad.offer.rooms === parseInt(roomFilter.value, 10);
    },

    checkGuests: function (ad) {
      if (guestsFilter.value === 'any') {
        return ad.offer.guests;
      }
      return ad.offer.guests === parseInt(guestsFilter.value, 10);
    },

  };

})();
