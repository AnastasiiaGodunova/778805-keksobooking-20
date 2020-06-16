'use strict';

(function () {
  /* Возвращает случайное число от и до*/
  var getRandomInteger = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  /* Возвращает случайный элемент массива*/
  var getRandomArrElement = function (arr) {
    return arr[getRandomInteger(0, arr.length - 1)];
  };

  /* Возвращает объект случайных элементов из массива*/
  var getRandomArray = function (arr) {
    var randomObject = {};
    for (var i = 0; i <= getRandomInteger(1, arr.length - 1); i++) {
      var randomElement = getRandomArrElement(arr);
      randomObject[randomElement] = true;
    }

    return Object.keys(randomObject);
  };

  window.utils = {
    getRandomInteger,
    getRandomArrElement,
    getRandomArray
  };
})();
