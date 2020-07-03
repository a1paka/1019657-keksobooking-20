'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var PINS_COUNT = 8;

  var similarPinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var cardNextElement = map.querySelector('.map__filters-container');

  var renderPinElement = function (ad, pins) {

    // pins = numberOfPins(PINS_COUNT);
    var pinElement = similarPinsTemplate.cloneNode(true);

    pinElement.style.left = ad.location.x - PIN_WIDTH + 'px';
    pinElement.style.top = ad.location.y - PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.querySelector('img').alt = ad.offer.title;
    pinElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      closeCard(ad);
      pinElement.classList.add('map__pin--active');
      map.insertBefore(window.card.renderCard(ad), cardNextElement);

      for (var i = 0; i < ad.length; i++) {
        mapPins.appendChild(window.card.createCardDom(pins[i]));
      }
      document.addEventListener('keydown', window.util.onCardEcsPress);
    });

    return pinElement;
  };

  var closeCard = function () {
    var mapCard = document.querySelector('.map__card');
    var mapPinActive = document.querySelector('.map__pin--active');

    if (mapCard) {
      mapCard.remove();
    }
    if (mapPinActive) {
      mapPinActive.classList.remove('map__pin--active');
    }
    document.removeEventListener('keydown', window.util.onCardEcsPress);
  };

  /* var numberOfPins = function (number) {
    var pins = [];
    for (var i = 0; i < number; i++) {
      pins.push(window.main.getMok(i));
    }
    return pins;
  }; */

  var createDomPins = function (pins) {
    pins = [];
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(renderPinElement(pins[i]));
    }
    mapPins.appendChild(fragment);
  };

  window.pin = {
    PINS_COUNT: PINS_COUNT,
    renderPinElement: renderPinElement,
    createDomPins: createDomPins,
    mapPins: mapPins,
  };
})();
