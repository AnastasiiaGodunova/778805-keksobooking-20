'use strict';

(function () {
  var PRICE_LIMITS = {
    low: 10000,
    high: 50000
  };

  var PriceToType = {
    low: function (price) {
      return price < PRICE_LIMITS.low;
    },
    middle: function (price) {
      return price >= PRICE_LIMITS.low && price < PRICE_LIMITS.high;
    },
    high: function (price) {
      return price >= PRICE_LIMITS.high;
    }
  };

  var filterType = function (arr, value, type) {
    return arr.filter(function (it) {
      return it.offer[type].toString() === value;
    });
  };

  var filterPrice = function (arr, value) {
    return arr.filter(function (it) {
      return PriceToType[value](it.offer.price);
    });
  };

  var filterFeatures = function (arr, value) {
    return arr.filter(function (it) {
      return it.offer.features.includes(value);
    });
  };

  var updatePins = function (data) {
    var allFilters = document.querySelectorAll('.map__filter');

    allFilters = Array.from(allFilters).filter(function (filter) {
      return filter.value !== 'any';
    });

    var featuresCheckbox = document.querySelectorAll('.map__checkbox:checked');

    var copyData = data.slice();

    allFilters.forEach(function (filter) {
      switch (filter.id) {
        case 'housing-type':
          copyData = filterType(copyData, filter.value, 'type');
          break;
        case 'housing-rooms':
          copyData = filterType(copyData, filter.value, 'rooms');
          break;
        case 'housing-guests':
          copyData = filterType(copyData, filter.value, 'guests');
          break;
        case 'housing-price':
          copyData = filterPrice(copyData, filter.value);
          break;
      }
    });

    featuresCheckbox.forEach(function (filter) {
      copyData = filterFeatures(copyData, filter.value);
    });

    return copyData;
  };

  window.filter = {
    update: updatePins
  };
})();
