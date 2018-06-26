'use strict';

// функция деактивации полей форм

(function () {
  var ESC_KEYCODE = 27;

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
    }
  };
})();

