'use strict';

(function () {
  // ф-я получения случайного элемента из массива
  function getRandom(randomArr) {
    return randomArr[Math.floor(Math.random() * randomArr.length)];
  }

  // ф-я получения случайного числа
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // ф-я перемешивания элементов массива
  function shuffleArray(array) {
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
  }

  var onCardEcsPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      window.card.closeCard();
    }
  };

  window.util = {
    getRandom: getRandom,
    getRandomInt: getRandomInt,
    shuffleArray: shuffleArray,
    onCardEcsPress: onCardEcsPress
  };
})();