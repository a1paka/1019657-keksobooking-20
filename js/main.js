'use strict';

var MAX_COUNT = 8;
var TITLE = ['Заголовок1', 'Заголовок2', 'Заголовок3', 'Заголовок4', 'Заголовок5', 'Заголовок6', 'Заголовок7', 'Заголовок8'];
var PRICE = ['100', '200', '500', '100500'];
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS_MIN = 1;
var ROOMS_MAX = 4;
var GUESTS_MIN = 1;
var GUESTS_MAX = 10;
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = ['Описание1', 'Описание2', 'Описание3', 'Описание4', 'Описание5', 'Описание6', 'Описание7', 'Описание8'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var LOCATION_X = 0;
var LOCATION_X_MAX = 1100;
var LOCATION_Y = 130;
var LOCATION_Y_MAX = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var similarListElement = document.querySelector('.map__pins');
var similarPinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// ф-я получения случайного элемента из массива
function getRandom(randomArr) {
  return randomArr[Math.floor(Math.random() * randomArr.length)];
}

// ф-я получения случайного числа
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// ф-я создания мока
var getMok = function (i) {
  var locationX = getRandomInt(LOCATION_X, LOCATION_X_MAX);
  var locationY = getRandomInt(LOCATION_Y, LOCATION_Y_MAX);
  var ad = {
    'author': {
      'avatar': 'img/avatars/user0' + (i + 1) + '.png',
    },
    'offer': {
      'title': getRandom(TITLE),
      'address': locationX + ',' + locationY,
      'price': getRandom(PRICE),
      'type': getRandom(TYPE),
      'rooms': getRandomInt(ROOMS_MIN, ROOMS_MAX),
      'guests': getRandomInt(GUESTS_MIN, GUESTS_MAX),
      'checkin': getRandom(CHECKIN),
      'checkout': getRandom(CHECKOUT),
      'features': getRandom(FEATURES),
      'description': getRandom(DESCRIPTION),
      'photos': getRandom(PHOTOS)
    },
    'location': {
      'x': locationX,
      'y': locationY
    }
  };
  return ad;
};

// ф-я создания пинов
var renderPinElement = function (pin) {
  var pinElement = similarPinsTemplate.cloneNode(true);

  pinElement.style.left = pin.location.x - PIN_WIDTH + 'px';
  pinElement.style.top = pin.location.y - PIN_HEIGHT + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;

  return pinElement;
};

var numberOfPins = function (number) {
  var pins = [];
  for (var i = 0; i < number; i++) {
    pins.push(getMok(i));
  }
  return pins;
};

var createDom = function (pins) {
  pins = numberOfPins(MAX_COUNT);
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(renderPinElement(pins[i]));
  }
  similarListElement.appendChild(fragment);
};
createDom();
