'use strict';
(function () {

  var MOUSE_LEFT_BUTTON = 0;
  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;

  var map = document.querySelector('.map');
  var pinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var fieldsets = document.querySelectorAll('fieldset, select');
  var address = adForm.querySelector('input[name="address"]');
  var resetButton = document.querySelector('.ad-form__reset');
  var mapFilters = document.querySelector('.map__filters');
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
    window.pinMove.pinCoordinate(address.value);

    pinMain.removeEventListener('mousedown', onActionActivate);
    pinMain.removeEventListener('keydown', onActionActivate);
    adForm.addEventListener('submit', window.messages.submitHandler);
    resetButton.addEventListener('click', resetPage);
    mapFilters.addEventListener('change', onMapFiltersChange);
  };

  var blockedPage = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.messages.removePins();
    adForm.reset();
    window.photos.removeImage();
    window.pinMove.pinCoordinate(address.value);

    pinMain.addEventListener('mousedown', onActionActivate);
    pinMain.addEventListener('keydown', onActionActivate);
    adForm.removeEventListener('submit', window.messages.submitHandler);
    resetButton.removeEventListener('click', resetPage);
    mapFilters.removeEventListener('change', onMapFiltersChange);
  };

  var resetPage = function () {
    blockedPage();
  };

  var onActionActivate = function (evt, data) {
    data = [];
    if (evt.button === MOUSE_LEFT_BUTTON || evt.code === 'Enter') {
      activePage();
      pinMain.removeEventListener('mousedown', onActionActivate);
      pinMain.removeEventListener('keydown', onActionActivate);
    }
    if (pins.length === 0) {
      pins = window.pin.render(data);
    }
  };
  pinMain.addEventListener('mousedown', onActionActivate);
  pinMain.addEventListener('keydown', onActionActivate);

  var successHandler = function (data) {
    pins = data;
    window.pin.render(pins);
  };

  // фильтрация
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');

  var filterHousingType = function (ad) {
    var isType = true;
    if (housingType.value !== 'any') {
      isType = ad.offer.type === housingType.value;
    }
    return isType;
  };

  var getPriceValue = function (ad) {
    var price;
    if (ad.offer.price < MIN_PRICE) {
      price = 'low';
    } else if ((ad.offer.price >= MIN_PRICE) && (ad.offer.price <= MAX_PRICE)) {
      price = 'middle';
    } else if (ad.offer.price > MAX_PRICE) {
      price = 'high';
    }
    return price;
  };

  var filterHousingPrice = function (ad) {
    var isPrice = true;
    if (housingPrice.value !== 'any') {
      isPrice = getPriceValue(ad) === housingPrice.value;
    }
    return isPrice;
  };

  var filterHousingRooms = function (ad) {
    var isRooms = true;
    if (housingRooms.value !== 'any') {
      isRooms = ad.offer.rooms === parseInt(housingRooms.value, 10);
    }
    return isRooms;
  };

  var filterHousingGuests = function (ad) {
    var isGuests = true;
    if (housingGuests.value !== 'any') {
      isGuests = ad.offer.guests === parseInt(housingGuests.value, 10);
    }
    return isGuests;
  };

  var filterHousingFeatures = function (arr) {
    var checkedFeatures = mapFilters.querySelectorAll('input:checked');

    return Array.from(checkedFeatures).every(function (element) {
      return arr.offer.features.includes(element.value);
    });
  };

  var getFilteredData = function (offers) {
    return offers.filter(function (ad) {
      return filterHousingType(ad) && filterHousingPrice(ad)
      && filterHousingRooms(ad) && filterHousingGuests(ad) && filterHousingFeatures(ad);
    });
  };

  var onMapFiltersChange = function () {
    window.card.closeCard();
    window.messages.removePins();
    window.debounce(window.pin.render(getFilteredData(pins)));
  };

  window.mainPin = {
    MOUSE_LEFT_BUTTON: MOUSE_LEFT_BUTTON,
    blockedPage: blockedPage,
    activePage: activePage,
    adForm: adForm,
    pinMain: pinMain,
    address: address
  };
})();
