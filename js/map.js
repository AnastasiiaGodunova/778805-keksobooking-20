'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormElements = adForm.querySelectorAll('.ad-form__element');
  var formReset = adForm.querySelector('.ad-form__reset');
  var addressInput = adForm.querySelector('input[name=address]');

  /* Удаляет класс*/
  var removeClass = function (elem, elemClass) {
    elem.classList.remove(elemClass);
  };

  /* Блокирует форму*/
  var setDisabled = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].disabled = !arr[i].disabled;
    }
  };

  /* Возвращает адрес метки*/
  var getAddressPin = function (obj, y) {
    var posX = Math.round(obj.offsetLeft + obj.offsetWidth / 2);
    var posY = Math.round(obj.offsetTop + obj.offsetHeight / y);
    addressInput.value = posX + ', ' + posY;
  };

  setDisabled(adFormElements);
  getAddressPin(mapPinMain, 2);

  /* Активное состояние страницы*/
  var activationPage = function () {
    removeClass(map, 'map--faded');
    removeClass(adForm, 'ad-form--disabled');

    window.pin.render(window.data);

    setDisabled(adFormElements);
    getAddressPin(mapPinMain, 1);
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === window.const.LEFT_BTN_KEY) {
      evt.preventDefault();
      activationPage();
    }
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === window.const.ENTER_KEY) {
      evt.preventDefault();
      activationPage();
    }
  });

  /* Возвращает страницу в неактивное состояние*/
  var deactivationPage = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    adForm.reset();
    setDisabled(adFormElements);
    window.pin.remove();
    getAddressPin(mapPinMain, 2);
  };

  formReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    deactivationPage();
  });

  window.getAddressPin = getAddressPin;
})();
