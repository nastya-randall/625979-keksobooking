'use strict';

// функция деактивации полей форм

(function () {
  window.utils = {
    disable: function (value, form) {
      for (var i = 0; i < form.length; i++) {
        form[i].disabled = value;
      }
    },

    getRandom: function (array) {
      return Math.floor(Math.random() * array.length);
    },

    getRandomInRange: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    getRandomArrayValue: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },

    shuffleArray: function (inputArray) {
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
    },

    getRandomShuffledArray: function (arr) {
      window.utils.shuffleArray(arr);
      var counter = Math.floor(Math.random() * arr.length);
      return arr.slice(counter, arr.length);
    }
  };
})();

