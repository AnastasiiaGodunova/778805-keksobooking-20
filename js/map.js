'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormElements = adForm.querySelectorAll('fieldset');
  var filtersForm = document.querySelector('.map__filters');
  var filtersElements = filtersForm.querySelectorAll('.map__filter');
  var filtersFieldsets = filtersForm.querySelectorAll('fieldset');
  var formReset = adForm.querySelector('.ad-form__reset');
  var addressInput = adForm.querySelector('input[name=address]');
  var isActive = false;
  var onFilterChange = window.debounce(window.data.update);

  var removeClass = function (elem, elemClass) {
    elem.classList.remove(elemClass);
  };

  var setDisabled = function (elements) {
    elements.forEach(function (el) {
      el.disabled = !el.disabled;
    });
  };

  var getAddressPin = function (obj, y) {
    var posX = Math.round(obj.offsetLeft + obj.offsetWidth / 2);
    var posY = Math.round(obj.offsetTop + obj.offsetHeight / y);
    addressInput.value = posX + ', ' + posY;
  };

  setDisabled(adFormElements);
  setDisabled(filtersElements);
  setDisabled(filtersFieldsets);
  getAddressPin(mapPinMain, 2);

  var activationPage = function () {
    removeClass(map, 'map--faded');
    removeClass(adForm, 'ad-form--disabled');

    window.data.features();

    setDisabled(adFormElements);
    setDisabled(filtersElements);
    setDisabled(filtersFieldsets);
    getAddressPin(mapPinMain, 1);

    isActive = true;
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === window.const.LEFT_BTN_KEY && !isActive) {
      evt.preventDefault();
      activationPage();
    }
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === window.const.ENTER_KEY && !isActive) {
      evt.preventDefault();
      activationPage();
    }
  });

  var deactivationPage = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');

    adForm.reset();
    window.pin.remove();

    setDisabled(adFormElements);
    setDisabled(filtersElements);
    setDisabled(filtersFieldsets);
    getAddressPin(mapPinMain, 2);

    isActive = false;
  };

  formReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    deactivationPage();
  });

  filtersForm.addEventListener('change', onFilterChange);

  window.map = {
    getAddressPin: getAddressPin,
    deactivationPage: deactivationPage
  };
})();
