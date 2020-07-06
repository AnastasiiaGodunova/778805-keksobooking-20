'use strict';

(function () {
  var filterType = function (arr, value, type) {
    return arr.filter(function (it) {
      return it.offer[type].toString() === value;
    });
  };

  var updatePins = function (data) {
    var allFilters = document.querySelectorAll('.map__filter');

    allFilters = Array.from(allFilters).filter(function (filter) {
      return filter.value !== 'any';
    });

    var copyData = data.slice();

    allFilters.forEach(function (filter) {
      switch (filter.id) {
        case 'housing-type':
          copyData = filterType(copyData, filter.value, 'type');
          break;
      }
    });

    return copyData;
  };

  window.filter = {
    update: updatePins
  };
})();
