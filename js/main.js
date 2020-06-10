'use strict';

var MAX_COUNT = 8;
var TITLE = ['Заголовок1', 'Заголовок2', 'Заголовок3', 'Заголовок4', 'Заголовок5', 'Заголовок6', 'Заголовок7', 'Заголовок8'];
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = ['Описание1', 'Описание2', 'Описание3', 'Описание4', 'Описание5', 'Описание6', 'Описание7', 'Описание8'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

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

// ф-я создания моков
var getMoks = function (i) {
  var description = {
    'author': {
      'avatar': 'img/avatars/user0' + (i + 1) + '.png',
    },
    'offer': {
      'title': getRandom(TITLE),
      'address': getRandomInt(0, 600) + ', ' + getRandomInt(0, 350),
      'price': getRandomInt(1000, 5000),
      'type': getRandom(TYPE),
      'rooms': getRandomInt(1, 4),
      'guests': getRandomInt(1, 10),
      'checkin': getRandom(CHECKIN),
      'checkout': getRandom(CHECKOUT),
      'features': getRandom(FEATURES),
      'description': getRandom(DESCRIPTION),
      'photos': getRandom(PHOTOS)
    },
    'location': {
      'x': getRandomInt(0, 1200),
      'y': getRandomInt(130, 630)
    }
  };
  return description;
};

// ф-я создания пинов
var renderPinElement = function (pin) {
  var pinElement = similarPinsTemplate.cloneNode(true);

  pinElement.style.left = pin.location.x + 'px';
  pinElement.style.top = pin.location.y + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;

  return pinElement;
};

var numberOfPins = function (number) {
  var pins = [];
  for (var i = 0; i < number; i++) {
    pins.push(getMoks());
  }
  return pins;
};

var createDom = function (pins) {
  pins = numberOfPins(MAX_COUNT);
  var arr = [];
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pins.length; i++) {
    arr.push(getMoks(i));
    fragment.appendChild(renderPinElement(arr[i]));
  }
  similarListElement.appendChild(fragment);
};
createDom();
