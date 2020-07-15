'use strict';
(function () {

  var housingType = document.querySelector('#housing-type');

  var filterHousingType = function (ads) {
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

  window.filter = {
    filterHousingType: filterHousingType
  };
})();
