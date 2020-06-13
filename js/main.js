'use strict';

var MAX_COUNT = 8;
var TITLES = ['Заголовок1', 'Заголовок2', 'Заголовок3', 'Заголовок4', 'Заголовок5', 'Заголовок6', 'Заголовок7', 'Заголовок8'];
var PRICES = ['100', '200', '500', '100500'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var POPUP_TYPES = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
};
var ROOMS_MIN = 1;
var ROOMS_MAX = 4;
var GUESTS_MIN = 1;
var GUESTS_MAX = 10;
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTIONS = ['Домик у моря (а не это вот все)', 'Описание2', 'Описание3', 'Описание4', 'Описание5', 'Описание6', 'Описание7', 'Описание8'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var LOCATION_X = 0;
var LOCATION_X_MAX = 1100;
var LOCATION_Y = 130;
var LOCATION_Y_MAX = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PHOTOS_WIDTH = 45;
var PHOTOS_HEIGHT = 40;

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
      'title': getRandom(TITLES),
      'address': locationX + ', ' + locationY,
      'price': getRandom(PRICES),
      'type': getRandom(TYPES),
      'rooms': getRandomInt(ROOMS_MIN, ROOMS_MAX),
      'guests': getRandomInt(GUESTS_MIN, GUESTS_MAX),
      'checkin': getRandom(CHECKIN),
      'checkout': getRandom(CHECKOUT),
      'features': getRandom(FEATURES),
      'description': getRandom(DESCRIPTIONS),
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

var similarCardsTemplate = document.querySelector('#card').content.querySelector('.map__card');

// ф-я создания карточки
var renderCard = function (ad) {
  var cardElement = similarCardsTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = ad.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = POPUP_TYPES[ad.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' Комнаты для ' + ad.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', ' + 'Выезд до ' + ad.offer.checkout;

  var renderFeatures = function () {
    var featureList = cardElement.querySelector('.popup__features');
    var featureElement = cardElement.querySelectorAll('.popup__feature');
    for (var i = ad.offer.features.length; i < featureElement.length; i++) {
      featureList.removeChild(featureElement[i]);
    }
  };
  renderFeatures();
  cardElement.querySelector('.popup__description').textContent = ad.offer.description;

  cardElement.querySelector('.popup__photos').innerHTML = '';
  var getPhoto = function () {
    var blockPhoto = document.createElement('img');
    blockPhoto.src = PHOTOS[1];
    blockPhoto.width = PHOTOS_WIDTH;
    blockPhoto.height = PHOTOS_HEIGHT;
    cardElement.querySelector('.popup__photos').appendChild(blockPhoto);
  };
  getPhoto();

  cardElement.querySelector('.popup__avatar').src = ad.author.avatar;

  return cardElement;
};


var createCardDom = function (obj) {
  obj = numberOfPins(MAX_COUNT);
  var fragment = document.createDocumentFragment();
  var cardNextElement = map.querySelector('.map__filters-container');

  for (var i = 0; i < obj.length; i++) {
    fragment.appendChild(renderCard(obj[0]));
    map.insertBefore(fragment, cardNextElement);
  }
  similarListElement.appendChild(fragment);
};
createCardDom();

