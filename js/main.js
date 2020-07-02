'use strict';
(function () {

  /* var TITLES = ['Пафосное место', 'Уютный уголок', 'Неуютный уголок', 'Домик на дереве', 'Центр мегаполиса', 'Клубный район', 'Заголовок7', 'Заголовок8'];
  var PRICES = ['100', '200', '500', '100500'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var ROOMS_MIN = 1;
  var ROOMS_MAX = 4;
  var GUESTS_MIN = 1;
  var GUESTS_MAX = 10;
  var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
  var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTIONS = ['Домик у моря (а не это вот все)', 'На 16 этаже, красивые закаты!', 'Описание3', 'Описание4', 'Описание5', 'Описание6', 'Описание7', 'Описание8'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var LOCATION_X = 0;
  var LOCATION_X_MAX = 1100;
  var LOCATION_Y = 130;
  var LOCATION_Y_MAX = 630; */

  var MOUSE_LEFT_BUTTON = 0;

  var map = document.querySelector('.map');

  // ф-я создания мока
  /* var getMok = function (i) {
    var locationX = window.util.getRandomInt(LOCATION_X, LOCATION_X_MAX);
    var locationY = window.util.getRandomInt(LOCATION_Y, LOCATION_Y_MAX);
    var ad = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png',
      },
      'offer': {
        'title': window.util.getRandom(TITLES),
        'address': locationX + ', ' + locationY,
        'price': window.util.getRandom(PRICES),
        'type': window.util.getRandom(TYPES),
        'rooms': window.util.getRandomInt(ROOMS_MIN, ROOMS_MAX),
        'guests': window.util.getRandomInt(GUESTS_MIN, GUESTS_MAX),
        'checkin': window.util.getRandom(CHECKIN_TIMES),
        'checkout': window.util.getRandom(CHECKOUT_TIMES),
        'features': window.util.shuffleArray(FEATURES).slice(0, window.util.getRandomInt(1, FEATURES.length)),
        'description': window.util.getRandom(DESCRIPTIONS),
        'photos': window.util.shuffleArray(PHOTOS).slice(0, window.util.getRandomInt(1, PHOTOS.length))
      },
      'location': {
        'x': locationX,
        'y': locationY
      }
    };
    return ad;
  }; */

  // активация
  var pinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var fieldsets = document.querySelectorAll('fieldset, select');
  var address = adForm.querySelector('input[name="address"]');
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
    window.backend.load(successHandler, errorHandler);
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

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  // ф-я заполнения поля адреса
  var pinCoordinate = function () {
    var coordinateX = Math.round(pinMain.offsetLeft + pinMain.offsetWidth / 2);
    var coordinateY = Math.round(pinMain.offsetTop + pinMain.offsetHeight / 2);
    var coordinates = coordinateX + ', ' + coordinateY;
    address.value = coordinates;
    address.setAttribute('readonly', 'readonly');
  };
  pinCoordinate(address.value);

})();
