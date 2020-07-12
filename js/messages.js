'use strict';
(function () {
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorButton = errorTemplate.querySelector('.error__button');

  // сообщение об успехе
  var createSuccessMessage = function () {
    document.body.appendChild(successTemplate);
    window.mainPin.blockedPage();
    document.addEventListener('keydown', onEcsPress);
    document.addEventListener('click', onButtonClick);
  };

  var closeSuccessMessage = function () {
    if (successTemplate) {
      successTemplate.remove();
    }
    document.addEventListener('keydown', onEcsPress);
    document.addEventListener('click', onButtonClick);
  };

  var onButtonClick = function (evt) {
    if (evt.button === window.mainPin.MOUSE_LEFT_BUTTON) {
      evt.preventDefault();
      closeSuccessMessage();
    }
  };

  var onEcsPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeSuccessMessage();
    }
  };

  // сообщения об ошибке
  var createErrorMessage = function () {
    document.body.appendChild(errorTemplate);
    window.mainPin.blockedPage();
    document.addEventListener('keydown', onEcsPressError);
    errorButton.addEventListener('click', onButtonClickError);
  };

  var closeErrorMessage = function () {
    window.mainPin.activePage();

    if (errorTemplate) {
      errorTemplate.remove();
    }
    document.addEventListener('keydown', onEcsPressError);
    errorButton.addEventListener('click', onButtonClickError);
  };

  var onButtonClickError = function (evt) {
    if (evt.button === window.mainPin.MOUSE_LEFT_BUTTON) {
      evt.preventDefault();
      closeErrorMessage();
    }
  };

  var onEcsPressError = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeErrorMessage();
    }
  };

  // удаляет все пины кроме главной
  var removePins = function () {
    var pinsAds = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pinsAds.forEach(function (item) {
      item.remove();
    });
  };

  var submitHandler = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(window.mainPin.adForm), createSuccessMessage, createErrorMessage);
  };
  window.mainPin.adForm.addEventListener('submit', submitHandler);

  window.messages = {
    createErrorMessage: createSuccessMessage,
    removePins: removePins,
    onEcsPress: onEcsPress,
    onButtonClick: onButtonClick,
    submitHandler: submitHandler
  };
})();
