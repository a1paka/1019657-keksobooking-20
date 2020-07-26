'use strict';
(function () {
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;
  var NUMBER_OF_ROOMS = '100';
  var NOT_FOR_GUESTS = '0';
  var BUNGALO_PRICE = 0;
  var FLAT_PRICE = 1000;
  var HOUSE_PRICE = 5000;
  var PALACE_PRICE = 10000;

  var housingTypesPrice = {
    'bungalo': {
      type: 'Бунгало',
      minPrice: BUNGALO_PRICE
    },
    'flat': {
      type: 'Квартира',
      minPrice: FLAT_PRICE
    },
    'house': {
      type: 'Дом',
      minPrice: HOUSE_PRICE
    },
    'palace': {
      type: 'Дворец',
      minPrice: PALACE_PRICE
    }
  };

  var adForm = document.querySelector('.ad-form');
  var formInputs = adForm.querySelectorAll('input, select');
  var adFormSubmit = adForm.querySelector('.ad-form__submit');
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

  price.addEventListener('invalid', function (evt) {
    evt.preventDefault();
    if (titleInput.validity.valueMissing) {
      price.setCustomValidity('Обязательное поле');
    } else {
      price.setCustomValidity('');
    }

    if (price.validity.rangeOverFlow) {
      price.setCustomValidity('Цена за ночь не может быть больше 1 000 000');
    } else {
      price.setCustomValidity('');
    }
  });

  var getPricesAndTypes = function () {
    var types = housingTypesPrice[type.value];
    price.min = types.minPrice;
    price.placeholder = types.minPrice;
  };
  price.addEventListener('change', getPricesAndTypes);
  type.addEventListener('change', getPricesAndTypes);
  getPricesAndTypes();

  // время заезда и выезда
  var timeIn = adForm.querySelector('select[name="timein"]');
  var timeOut = adForm.querySelector('select[name="timeout"]');

  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });
  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });

  // проверка валидности полей
  var checkFormFields = function (inputs) {
    inputs.forEach(function (input) {
      if (!input.validity.valid) {
        input.classList.add('error-form');
        return;
      }

      input.classList.remove('error-form');
    });
  };

  adFormSubmit.addEventListener('click', function () {
    checkFormFields(formInputs);
  });

  var removeErrorInput = function (inputs) {
    inputs.forEach(function (input) {
      if (input.classList.contains('error-form')) {
        input.classList.remove('error-form');
      }
    });
  };

  window.form = {
    getPricesAndTypes: getPricesAndTypes,
    removeErrorInput: removeErrorInput,
    checkFormFields: checkFormFields
  };
})();
