'use strict';

// функция деактивации полей форм

(function () {
  window.disable = function (value, form) {
    for (var i = 0; i < form.length; i++) {
      form[i].disabled = value;
    }
  };
})();
