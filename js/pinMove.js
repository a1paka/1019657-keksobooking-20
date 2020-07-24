'use strict';
(function () {

  var MAIN_PIN_WIDTH = 66;
  var MAIN_PIN_HEIGHT = 66;
  var MAIN_PIN_POINTER = 22;
  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;
  var LOCATION_X_MIN = 0;
  var LOCATION_X_MAX = 1200;

  // перемещение
  window.mainPin.pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.mainPin.pinMain.style.top = window.mainPin.pinMain.offsetTop - shift.y + 'px';
      window.mainPin.pinMain.style.left = window.mainPin.pinMain.offsetLeft - shift.x + 'px';

      if (window.mainPin.pinMain.offsetLeft < LOCATION_X_MIN - MAIN_PIN_WIDTH / 2) {
        window.mainPin.pinMain.style.left = LOCATION_X_MIN - MAIN_PIN_WIDTH / 2 + 'px';
      } else if (window.mainPin.pinMain.offsetLeft > LOCATION_X_MAX - MAIN_PIN_WIDTH / 2) {
        window.mainPin.pinMain.style.left = LOCATION_X_MAX - MAIN_PIN_WIDTH / 2 + 'px';
      }

      if (window.mainPin.pinMain.offsetTop < LOCATION_Y_MIN - MAIN_PIN_HEIGHT - MAIN_PIN_POINTER / 2) {
        window.mainPin.pinMain.style.top = LOCATION_Y_MIN - MAIN_PIN_HEIGHT - MAIN_PIN_POINTER / 2 + 'px';
      } else if (window.mainPin.pinMain.offsetTop > LOCATION_Y_MAX - MAIN_PIN_HEIGHT - MAIN_PIN_POINTER / 2) {
        window.mainPin.pinMain.style.top = LOCATION_Y_MAX - MAIN_PIN_HEIGHT - MAIN_PIN_POINTER / 2 + 'px';
      }

      window.mainPin.address.value = Math.round(window.mainPin.pinMain.offsetLeft + MAIN_PIN_WIDTH / 2) + ', ' + Math.round(window.mainPin.pinMain.offsetTop + MAIN_PIN_HEIGHT + MAIN_PIN_POINTER / 2);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // ф-я заполнения поля адреса
  var pinCoordinate = function () {
    var coordinateX = Math.round(window.mainPin.pinMain.offsetLeft + MAIN_PIN_WIDTH / 2);
    var coordinateY = Math.round(window.mainPin.pinMain.offsetTop + MAIN_PIN_HEIGHT / 2);
    window.mainPin.address.value = coordinateX + ', ' + coordinateY;
    window.mainPin.address.setAttribute('readonly', 'readonly');
  };
  pinCoordinate(window.mainPin.address.value);

  window.pinMove = {
    pinCoordinate: pinCoordinate,
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    MAIN_PIN_POINTER: MAIN_PIN_POINTER
  };

})();
