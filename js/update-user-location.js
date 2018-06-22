'use strict';

// функция получения координат пина пользователя и запись их в поле адреса

(function () {
  var USER_PIN_WIDTH = 65;
  var USER_PIN_HEIGHT = 81;
  window.updateUserLocation = function () {
    var userPin = document.querySelector('.map__pin--main');
    userPin = {
      location: {
        x: Math.floor(parseInt(userPin.style.left, 10) + USER_PIN_WIDTH / 2),
        y: Math.floor(parseInt(userPin.style.top, 10) + USER_PIN_HEIGHT)
      }
    };

    document.querySelector('#address').value = userPin.location.x + ', ' + userPin.location.y;
  };
})();
