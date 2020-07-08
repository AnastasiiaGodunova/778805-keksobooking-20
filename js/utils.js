'use strict';

(function () {
  var getRandomInteger = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  var getRandomArrElement = function (arr) {
    return arr[getRandomInteger(0, arr.length - 1)];
  };

  var getRandomArray = function (arr) {
    var randomObject = {};
    for (var i = 0; i <= getRandomInteger(1, arr.length - 1); i++) {
      var randomElement = getRandomArrElement(arr);
      randomObject[randomElement] = true;
    }

    return Object.keys(randomObject);
  };

  window.utils = {
    getRandomInteger: getRandomInteger,
    getRandomArrElement: getRandomArrElement,
    getRandomArray: getRandomArray
  };
})();
