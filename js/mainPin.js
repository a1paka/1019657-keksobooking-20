'use strict';
(function () {

  var MOUSE_LEFT_BUTTON = 0;

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
    window.pinMove.pinCoordinate(address.value);

    pinMain.addEventListener('mousedown', onActionActivate);
    pinMain.addEventListener('keydown', onActionActivate);
    adForm.removeEventListener('submit', window.messages.submitHandler);
    resetButton.removeEventListener('click', resetPage);
    mapFilters.removeEventListener('change', onMapFiltersChange);
  };

  var resetPage = function () {
    window.mainPin.blockedPage();
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
  var housingType = document.querySelector('#housing-type');

  /* var filterHousingType = function (ads) {
    var filterData = ads;
    if (housingType.value !== 'any') {
      filterData = ads.filter(function (ad) {
        return ad.offer.type === housingType.value;
      });
    }
    window.card.closeCard();
    window.messages.removePins();
    window.debounce(window.pin.render(filterData));
  };

  var onMapFiltersChange = function () {
    filterHousingType(pins);
  };
 */
  // var filterData;
  var filterHousingType = function (arr) {
    if (housingType.value !== 'any') {
      arr = pins.filter(function (ad) {
        return ad.offer.type === housingType.value;
      });
    }
    return arr;
  };

  var onMapFiltersChange = function (arrayAds) {
    var filterData = arrayAds;
    filterData = filterHousingType(pins);

    window.card.closeCard();
    window.messages.removePins();
    window.debounce(window.pin.render(filterData));
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
