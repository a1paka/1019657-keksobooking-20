'use strict';
(function () {

  var MOUSE_LEFT_BUTTON = 0;
  var MAIN_PIN_WIDTH = 66;
  var MAIN_PIN_HEIGHT = 66;
  var MAIN_PIN_POINTER = 22;
  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;
  var LOCATION_X_MIN = 0;
  var LOCATION_X_MAX = 1200;

  var map = document.querySelector('.map');
  var pinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var fieldsets = document.querySelectorAll('fieldset, select');
  var address = adForm.querySelector('input[name="address"]');
  var resetButton = document.querySelector('.ad-form__reset');
  var pins = [];

  var formDisabled = function () {
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].setAttribute('disabled', 'disabled');
    }
  };
  formDisabled(fieldsets);

  var formActive = function () {
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].removeAttribute('disabled');
    }
  };

  var activePage = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    formActive(fieldsets);
    window.backend.load(successHandler, window.messages.createErrorMessage);
    resetButton.addEventListener('click', resetPage);
    pinCoordinate(address.value);

    pinMain.removeEventListener('mousedown', onActionActivate);
    pinMain.removeEventListener('keydown', onActionActivate);
    adForm.addEventListener('submit', window.messages.submitHandler);
    resetButton.addEventListener('click', resetPage);
  };

  var blockedPage = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.messages.removePins();
    adForm.reset();
    pinCoordinate(address.value);

    pinMain.addEventListener('mousedown', onActionActivate);
    pinMain.addEventListener('keydown', onActionActivate);
    adForm.removeEventListener('submit', window.messages.submitHandler);
    resetButton.removeEventListener('click', resetPage);
  };

  var resetPage = function () {
    window.mainPin.blockedPage();
  };

  var onActionActivate = function (evt) {
    if (evt.button === MOUSE_LEFT_BUTTON || evt.code === 'Enter') {
      activePage();
      pinMain.removeEventListener('mousedown', onActionActivate);
      pinMain.removeEventListener('keydown', onActionActivate);
    }
    if (pins.length === 0) {
      pins = window.pin.createDomPins();
    }
  };
  pinMain.addEventListener('mousedown', onActionActivate);
  pinMain.addEventListener('keydown', onActionActivate);


  var successHandler = function (pinsArr) {
    pins = pinsArr;
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.pin.PINS_COUNT; i++) {
      fragment.appendChild(window.pin.renderPinElement(pinsArr[i]));
    }
    document.querySelector('.map__pins').appendChild(fragment);
  };

  // перемещение
  pinMain.addEventListener('mousedown', function (evt) {
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

      pinMain.style.top = pinMain.offsetTop - shift.y + 'px';
      pinMain.style.left = pinMain.offsetLeft - shift.x + 'px';

      if (pinMain.offsetLeft < LOCATION_X_MIN - MAIN_PIN_WIDTH / 2) {
        pinMain.style.left = LOCATION_X_MIN - MAIN_PIN_WIDTH / 2 + 'px';
      } else if (pinMain.offsetLeft > LOCATION_X_MAX - MAIN_PIN_WIDTH / 2) {
        pinMain.style.left = LOCATION_X_MAX - MAIN_PIN_WIDTH / 2 + 'px';
      }

      if (pinMain.offsetTop < LOCATION_Y_MIN - MAIN_PIN_HEIGHT - MAIN_PIN_POINTER / 2) {
        pinMain.style.top = LOCATION_Y_MIN - MAIN_PIN_HEIGHT - MAIN_PIN_POINTER / 2 + 'px';
      } else if (pinMain.offsetTop > LOCATION_Y_MAX - MAIN_PIN_HEIGHT - MAIN_PIN_POINTER / 2) {
        pinMain.style.top = LOCATION_Y_MAX - MAIN_PIN_HEIGHT - MAIN_PIN_POINTER / 2 + 'px';
      }

      address.value = Math.round(pinMain.offsetLeft + MAIN_PIN_WIDTH / 2) + ', ' + Math.round(pinMain.offsetTop + MAIN_PIN_HEIGHT + MAIN_PIN_POINTER / 2);
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
    var coordinateX = Math.round(pinMain.offsetLeft + MAIN_PIN_WIDTH / 2);
    var coordinateY = Math.round(pinMain.offsetTop + MAIN_PIN_HEIGHT / 2);
    address.value = coordinateX + ', ' + coordinateY;
    address.setAttribute('readonly', 'readonly');
  };
  pinCoordinate(address.value);

  window.mainPin = {
    MOUSE_LEFT_BUTTON: MOUSE_LEFT_BUTTON,
    blockedPage: blockedPage,
    activePage: activePage,
    adForm: adForm,
    pinCoordinate: pinCoordinate
  };
})();
