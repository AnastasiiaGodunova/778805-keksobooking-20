'use strict';

(function () {
  var MIN_X = 0;
  var MAX_X = 1136;
  var MIN_Y = 130;
  var MAX_Y = 630;

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var minXPinPosition = MIN_X - mapPinMain.offsetWidth / 2;
  var maxXPinPosition = MAX_X + mapPinMain.offsetWidth / 2;
  var minYPinPosition = MIN_Y - mapPinMain.offsetHeight;

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

      if (mapPinMain.offsetLeft - shift.x < minXPinPosition) {
        mapPinMain.style.left = minXPinPosition + 'px';
      } else if (mapPinMain.offsetLeft - shift.x > maxXPinPosition) {
        mapPinMain.style.left = maxXPinPosition + 'px';
      } else {
        mapPinMain.style.left = mapPinMain.offsetLeft - shift.x + 'px';
      }

      if (mapPinMain.offsetTop - shift.y < minYPinPosition) {
        mapPinMain.style.top = minYPinPosition + 'px';
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
