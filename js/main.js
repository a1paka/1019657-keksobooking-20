'use strict';

var MAX_COUNT = 8;
var TITLES = ['Пафосное место', 'Уютный уголок', 'Неуютный уголок', 'Заголовок4', 'Заголовок5', 'Заголовок6', 'Заголовок7', 'Заголовок8'];
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

// ф-я перемешивания элементов массива
var shuffleArray = function (array) {
  var j;
  var temp;
  var arr = array.slice();

  for (var i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
};

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
      'features': shuffleArray(FEATURES).slice(0, getRandomInt(1, FEATURES.length)),
      'description': getRandom(DESCRIPTIONS),
      'photos': shuffleArray(PHOTOS).slice(0, getRandomInt(1, PHOTOS.length))
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
  cardElement.querySelector('.popup__features').innerHTML = '';

  var renderFeatures = function () {
    if (ad.offer.features.length >= 1) {
      for (var i = 0; i < ad.offer.features.length; i++) {
        var cardLiElement = document.createElement('li');
        cardLiElement.classList.add('popup__feature');
        cardLiElement.classList.add('popup__feature--' + ad.offer.features[i]);
        cardElement.querySelector('.popup__features').appendChild(cardLiElement);
      }
    }
  };
  renderFeatures();

  cardElement.querySelector('.popup__description').textContent = ad.offer.description;

  var renderPhotos = function () {
    cardElement.querySelector('.popup__photo').src = ad.offer.photos[0];
    if (ad.offer.photos.length > 1) {
      for (var i = 1; i < ad.offer.photos.length; i++) {
        var cardImgElement = similarCardsTemplate.querySelector('.popup__photo').cloneNode();
        cardImgElement.src = ad.offer.photos[i];
        cardElement.querySelector('.popup__photos').appendChild(cardImgElement);
      }
    }
  };
  renderPhotos();

  cardElement.querySelector('.popup__avatar').src = ad.author.avatar;

  return cardElement;
};

var createCardDom = function (obj) {
  obj = numberOfPins(MAX_COUNT);
  var cardNextElement = map.querySelector('.map__filters-container');
  for (var i = 0; i < obj.length; i++) {
    map.insertBefore(renderCard(obj[0]), cardNextElement);
  }
};
createCardDom();

