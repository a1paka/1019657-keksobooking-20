'use strict';
(function () {
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;
  var NUMBER_OF_ROOMS = '100';
  var NOT_FOR_GUESTS = '0';
  var MAX_PRICE = 1000000;
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

  var adForm = document.querySelector('.ad-form');
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
})();
