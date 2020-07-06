'use strict';

(function () {
  var adverts = [];

  var successHandler = function (data) {
    adverts = data;
    window.pin.render(window.filter.update(adverts));
  };

  var defaultPins = function () {
    window.backend.load(successHandler, window.message.error);
  };

  var updateAdverts = function () {
    window.pin.remove();
    window.card.remove();
    window.pin.render(window.filter.update(adverts));
  };

  window.data = {
    update: updateAdverts,
    default: defaultPins
  };
})();
