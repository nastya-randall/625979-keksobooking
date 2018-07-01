'use strict';

// функция деактивации полей форм

(function () {
  var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 500; // ms

  window.utils = {
    disable: function (value, form) {
      for (var i = 0; i < form.length; i++) {
        form[i].disabled = value;
      }
    },

    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },

    clamp: function (num, min, max) {
      return Math.min(Math.max(num, min), max);
    },

    debounce: function (fun) {
      var lastTimeout = null;
      return function () {
        var args = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          fun.apply(null, args);
        }, DEBOUNCE_INTERVAL);
      };
    }
  };
})();

