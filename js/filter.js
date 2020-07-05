'use strict';

(function () {
  var allFilters = document.querySelectorAll('.map__filter');
  var typeFilter = document.querySelector('#housing-type');
  var pins = [];

  var filterType = function (arr, value) {
    return arr.filter(function (it) {
      return it.offer[type].toString() === value;
    });
  };

  var updatePins = function () {
    var checkedFilters = Array.from(allFilters).filter(function (filter) {
      return filter.value !== 'any';
    });

    window.pin.render(pins.sort(function () {
      checkedFilters.forEach(function (item) {
        pins = filterValue(pins, item.value);
      });
    }));

    return pins;
  };

  typeFilter.addEventListener('change', function () {
    updatePins();
  });

})();
