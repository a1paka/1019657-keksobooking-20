'use strict';

(function () {
  var POPUP_TYPES = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец',
  };
  var MAX_COUNT = 8;

  var similarCardsTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var mapElement = document.querySelector('.map');
  var cardNextElement = mapElement.querySelector('.map__filters-container');

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
      } if (ad.offer.features.length === 0) {
        cardElement.querySelector('.popup__features').remove();
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
      } if (ad.offer.photos.length === 0) {
        cardElement.querySelector('.popup__photos').remove();
      }
    };
    renderPhotos();

    cardElement.querySelector('.popup__avatar').src = ad.author.avatar;

    var closeButtonElement = cardElement.querySelector('.popup__close');
    closeButtonElement.addEventListener('click', function () {
      cardElement.remove();
    });

    return cardElement;
  };

  var createCardDom = function (obj) {
    obj = window.utils.numberOfPins(MAX_COUNT);
    for (var i = 0; i < obj.length; i++) {
      mapElement.insertBefore(renderCard(obj[0]), cardNextElement);
    }
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
    document.removeEventListener('keydown', window.utils.onCardEscPress);
  };

  window.card = {
    createCardDom: createCardDom,
    renderCard: renderCard,
    closeCard: closeCard,
    similarCardsTemplate: similarCardsTemplate
  };
})();
