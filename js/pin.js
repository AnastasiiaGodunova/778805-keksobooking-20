'use strict';

(function () {
  var PIN_HEIGHT = 40;
  var PIN_WIDTH = 40;

  var mapPin = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var mapPinsBlock = document.querySelector('.map__pins');

  var pins = window.data.getRandomPins();

  /* Возвращает заполнунную метку*/
  var getFillPin = function (obj) {
    var pinElement = mapPin.cloneNode(true);
    var mapPinImg = pinElement.querySelector('img');

    pinElement.style.left = obj.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = obj.location.y - PIN_HEIGHT / 2 + 'px';

    mapPinImg.src = obj.author.avatar;
    mapPinImg.alt = obj.offer.title;

    return pinElement;
  };

  /* Отрисовывает метки*/
  window.pin = {
    renderPins: function () {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < pins.length; i++) {
        fragment.appendChild(getFillPin(pins[i]));
      }
      mapPinsBlock.appendChild(fragment);
    }
  };
})();
