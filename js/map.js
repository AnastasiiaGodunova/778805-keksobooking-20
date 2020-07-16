'use strict';

(function () {
  var MIN_PRICE = 0;

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormElements = adForm.querySelectorAll('fieldset');
  var filtersForm = document.querySelector('.map__filters');
  var filtersElements = filtersForm.querySelectorAll('.map__filter');
  var filtersFieldsets = filtersForm.querySelectorAll('fieldset');
  var formReset = adForm.querySelector('.ad-form__reset');
  var addressInput = adForm.querySelector('input[name=address]');
  var priceInput = adForm.querySelector('input[name=price]');
  var onFilterChange = window.debounce(window.data.update);
  var pinStartingPosX = mapPinMain.style.left;
  var pinStartingPosY = mapPinMain.style.top;

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

    window.data.load();

    setDisabled(adFormElements);
    setDisabled(filtersElements);
    setDisabled(filtersFieldsets);
    getAddressPin(mapPinMain, 1);

    mapPinMain.removeEventListener('mousedown', onMapPinMainClick);
    mapPinMain.removeEventListener('keydown', onMapPinMainEnterPress);
  };

  var onMapPinMainClick = function (evt) {
    if (evt.button === window.const.LEFT_BTN_KEY) {
      evt.preventDefault();
      activationPage();
    }
  };

  var onMapPinMainEnterPress = function (evt) {
    if (evt.key === window.const.ENTER_KEY) {
      evt.preventDefault();
      activationPage();
    }
  };

  mapPinMain.addEventListener('mousedown', onMapPinMainClick);
  mapPinMain.addEventListener('keydown', onMapPinMainEnterPress);

  var deactivationPage = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');

    mapPinMain.style.left = pinStartingPosX;
    mapPinMain.style.top = pinStartingPosY;
    priceInput.placeholder = MIN_PRICE;
    priceInput.min = MIN_PRICE;

    adForm.reset();
    window.pin.remove();

    setDisabled(adFormElements);
    setDisabled(filtersElements);
    setDisabled(filtersFieldsets);
    getAddressPin(mapPinMain, 2);
    window.avatar.remove();

    mapPinMain.addEventListener('mousedown', onMapPinMainClick);
    mapPinMain.addEventListener('keydown', onMapPinMainEnterPress);
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
