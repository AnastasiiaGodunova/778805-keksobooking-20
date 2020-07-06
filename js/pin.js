'use strict';

(function () {
  var PIN_HEIGHT = 40;
  var PIN_WIDTH = 40;
  var MAX_PINS = 5;

  var mapPin = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var mapPinsBlock = document.querySelector('.map__pins');

  /* Возвращает заполнунную метку*/
  var getFillPin = function (obj) {
    var pinElement = mapPin.cloneNode(true);
    var mapPinImg = pinElement.querySelector('img');

    pinElement.style.left = obj.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = obj.location.y - PIN_HEIGHT / 2 + 'px';

    mapPinImg.src = obj.author.avatar;
    mapPinImg.alt = obj.offer.title;

    pinElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      window.card.remove();
      window.card.render(obj);
    });

    return pinElement;
  };

  /* Отрисовывает метки*/
  var renderPins = function (arr) {
    var fragment = document.createDocumentFragment();
    arr.length = arr.length > MAX_PINS ? MAX_PINS : arr.length;

    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(getFillPin(arr[i]));
    }
    mapPinsBlock.appendChild(fragment);
  };

  /* Удаляет метки*/
  var removePins = function () {
    var mapPins = mapPinsBlock.querySelectorAll('.map__pin');
    for (var i = 0; i < mapPins.length; i++) {
      if (!mapPins[i].classList.contains('map__pin--main')) {
        mapPins[i].remove();
      }
    }
  };

  window.pin = {
    render: renderPins,
    remove: removePins
  };
})();
