'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 500;
  var ESCAPE_KEY = 'Escape';

  var onCardEscPress = function (evt) {
    if (evt.key === ESCAPE_KEY) {
      evt.preventDefault();
      window.card.closeCard();
    }
  };

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.utils = {
    onCardEcsPress: onCardEscPress,
    debounce: debounce
  };
})();
