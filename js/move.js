'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');

  var MIN_X = 0 - mapPinMain.offsetWidth / 2;
  var MAX_X = 1136 + mapPinMain.offsetWidth / 2;
  var MIN_Y = 130 - mapPinMain.offsetHeight;
  var MAX_Y = 630;

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (mapPinMain.offsetLeft - shift.x < MIN_X) {
        mapPinMain.style.left = MIN_X + 'px';
      } else if (mapPinMain.offsetLeft - shift.x > MAX_X) {
        mapPinMain.style.left = MAX_X + 'px';
      } else {
        mapPinMain.style.left = mapPinMain.offsetLeft - shift.x + 'px';
      }

      if (mapPinMain.offsetTop - shift.y < MIN_Y) {
        mapPinMain.style.top = MIN_Y + 'px';
      } else if (mapPinMain.offsetTop - shift.y > MAX_Y) {
        mapPinMain.style.top = MAX_Y + 'px';
      } else {
        mapPinMain.style.top = mapPinMain.offsetTop - shift.y + 'px';
      }

      window.map.getAddressPin(mapPinMain, 1);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
