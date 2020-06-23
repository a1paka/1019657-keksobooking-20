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

var MIN_TITLE_LENGTH = 30;
var MAX_TITLE_LENGTH = 100;
var NUMBER_OF_ROOMS = '100';
var NOT_FOR_GUESTS = '0';

var MOUSE_LEFT_BUTTON = 0;

var TYPES_PRICES = {
  'bungalo': {
    type: 'Бунгало',
    minPrice: 0
  },
  'flat': {
    type: 'Квартира',
    minPrice: 1000
  },
  'house': {
    type: 'Дом',
    minPrice: 5000
  },
  'palace': {
    type: 'Дворец',
    minPrice: 10000
  }
};
var MAX_PRICE = 1000000;

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var similarPinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var similarCardsTemplate = document.querySelector('#card').content.querySelector('.map__card');
var cardNextElement = map.querySelector('.map__filters-container');

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
var renderPinElement = function (ad) {
  var pinElement = similarPinsTemplate.cloneNode(true);

  pinElement.style.left = ad.location.x - PIN_WIDTH + 'px';
  pinElement.style.top = ad.location.y - PIN_HEIGHT + 'px';
  pinElement.querySelector('img').src = ad.author.avatar;
  pinElement.querySelector('img').alt = ad.offer.title;

  pinElement.addEventListener('click', function (evt) {
    evt.preventDefault();
    closeCard();
    pinElement.classList.add('map__pin--active');
    map.insertBefore(createCardDom(ad));
  });

  return pinElement;
};

// открытие.закрытие карточки
var closeCard = function () {
  var mapCard = document.querySelector('.map__card');
  var mapPinActive = document.querySelector('.map__pin--active');

  if (mapCard) {
    mapCard.remove();
    mapPinActive.classList.remove('map__pin--active');
  }
  document.removeEventListener('keydown', onCardEcsPress);
  document.removeEventListener('click', onCardMouseClick);
};

var onCardEcsPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeCard();
  }
};

var onCardMouseClick = function (evt) {
  if (evt.key === MOUSE_LEFT_BUTTON) {
    evt.preventDefault();
    closeCard();
  }
};

var numberOfPins = function (number) {
  var pins = [];
  for (var i = 0; i < number; i++) {
    pins.push(getMok(i));
  }
  return pins;
};

var createDomPins = function (pins) {
  pins = numberOfPins(MAX_COUNT);
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(renderPinElement(pins[i]));
  }
  mapPins.appendChild(fragment);
};

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

  var popupClose = cardElement.querySelector('.popup__close');
  popupClose.addEventListener('click', onCardMouseClick);

  return cardElement;
};

var createCardDom = function (obj) {
  obj = numberOfPins(MAX_COUNT);
  for (var i = 0; i < obj.length; i++) {
    map.insertBefore(renderCard(obj[0]), cardNextElement);
  }
};

var pinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var fieldsets = document.querySelectorAll('fieldset, select');
var address = adForm.querySelector('input[name="address"]');
var pins = [];

// активация
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
};

pinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === MOUSE_LEFT_BUTTON) {
    activePage();
  }
  if (pins.length === 0) {
    pins = createDomPins();
  }
});

pinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    activePage();
  }
  if (pins.length === 0) {
    pins = createDomPins();
  }
});

// ф-я заполнения поля адреса
var pinCoordinate = function () {
  var coordinateX = Math.round(pinMain.offsetLeft + pinMain.offsetWidth / 2);
  var coordinateY = Math.round(pinMain.offsetTop + pinMain.offsetHeight / 2);
  var coordinates = coordinateX + ', ' + coordinateY;
  address.value = coordinates;
  address.setAttribute('readonly', 'readonly');
};
pinCoordinate(address.value);

// валидация заголовка
var titleInput = adForm.querySelector('input[name="title"]');
titleInput.addEventListener('invalid', function () {
  if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity('Обязательное поле');
  } else {
    titleInput.setCustomValidity('');
  }
});

titleInput.addEventListener('input', function () {
  var valueLength = titleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
  } else {
    titleInput.setCustomValidity('');
  }
});

// валидация
// гостей и комнат
var rooms = adForm.querySelector('select[name="rooms"]');
var guests = adForm.querySelector('select[name="capacity"');

var getRoomsAndGuests = function () {
  if (rooms.value < guests.value) {
    guests.setCustomValidity('Выберите больше гостей или уменьшите количество комнат');
  } else if (rooms.value === NUMBER_OF_ROOMS && guests.value !== NOT_FOR_GUESTS) {
    guests.setCustomValidity('Комната не для гостей');
  } else if (rooms.value !== NUMBER_OF_ROOMS && guests.value === NOT_FOR_GUESTS) {
    guests.setCustomValidity('Выберите большее количество комнат');
  } else {
    guests.setCustomValidity('');
  }
};
rooms.addEventListener('change', getRoomsAndGuests);
guests.addEventListener('change', getRoomsAndGuests);

// тип жилья и цена
var price = adForm.querySelector('input[name="price"]');
var type = adForm.querySelector('select[name="type"]');

price.addEventListener('invalid', function () {
  if (titleInput.validity.valueMissing) {
    price.setCustomValidity('Обязательное поле');
  } else {
    price.setCustomValidity('');
  }
});

var getPricesAndTypes = function () {
  if (price.value > MAX_PRICE) {
    price.setCustomValidity('Цена за ночь не может быть больше 1 000 000');
  } else {
    price.setCustomValidity('');
  }
  var types = TYPES_PRICES[type.value];
  price.placeholder = types.minPrice;
  price.min = types.minPrice;
  price.setAttribute('type', 'number');
};
price.addEventListener('change', getPricesAndTypes);
type.addEventListener('change', getPricesAndTypes);

// время заезда и выезда
var timeIn = adForm.querySelector('select[name="timein"]');
var timeOut = adForm.querySelector('select[name="timeout"]');

timeIn.addEventListener('change', function () {
  timeOut.value = timeIn.value;
});
timeOut.addEventListener('change', function () {
  timeIn.value = timeOut.value;
});

// загрузка изображения
var avatar = adForm.querySelector('#avatar');
var image = adForm.querySelector('#images');

var getAvatarChange = function () {
  if (avatar.files[0].type !== 'image/jpeg') {
    avatar.setCustomValidity('Загрузить можно только изображения');
  }
};
avatar.addEventListener('change', getAvatarChange);

var getImageChange = function () {
  if (image.files[0].type !== 'image/jpeg') {
    image.setCustomValidity('Загрузить можно только изображения');
  }
};
image.addEventListener('change', getImageChange);
