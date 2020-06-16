'use strict';

(function () {
  var LEFT_BTN_KEY = 0;
  var ENTER_KEY = 'Enter';

  window.map = document.querySelector('.map');
  var formReset = window.form.adForm.querySelector('.ad-form__reset');

  /* Удаляет класс*/
  var removeClass = function (elem, elemClass) {
    elem.classList.remove(elemClass);
  };

  /* Активное состояние страницы*/
  var activationPage = function () {
    removeClass(window.map, 'map--faded');
    removeClass(window.form.adForm, 'ad-form--disabled');

    window.renderPins();

    window.form.setDisabled(window.adFormElements);
    window.form.getAddressPin(window.mapPinMain, 1);
  };

  window.mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === LEFT_BTN_KEY) {
      evt.preventDefault();
      activationPage();
    }
  });

  window.mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      evt.preventDefault();
      activationPage();
    }
  });

  /* Удаляет метки*/
  var removePins = function () {
    var mapPins = window.form.mapPinsBlock.querySelectorAll('.map__pin');
    for (var i = 0; i < mapPins.length; i++) {
      if (!mapPins[i].classList.contains('map__pin--main')) {
        mapPins[i].remove();
      }
    }
  };

  /* Возвращает страницу в неактивное состояние*/
  var deactivationPage = function () {
    window.map.classList.add('map--faded');
    window.form.adForm.classList.add('ad-form--disabled');
    window.form.adForm.reset();
    window.form.setDisabled(window.adFormElements);
    removePins();
    window.form.getAddressPin(window.mapPinMain, 2);
  };

  formReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    deactivationPage();
  });
})();
