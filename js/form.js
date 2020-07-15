'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var typeToPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  var roomsGuestsDependencies = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0']
  };

  var titleInput = adForm.querySelector('input[name=title]');
  var typeSelect = adForm.querySelector('select[name=type]');
  var priceInput = adForm.querySelector('input[name=price]');
  var timeIn = adForm.querySelector('select[name=timein]');
  var timeOut = adForm.querySelector('select[name=timeout]');
  var roomsSelect = adForm.querySelector('select[name=rooms]');
  var capacitySelect = adForm.querySelector('select[name=capacity]');

  var getCustomMessageTitle = function () {
    if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity('Заголовок должен состоять минимум из 30 символов, сейчас '
      + titleInput.value.length + ' символов');
    } else if (titleInput.validity.tooLong) {
      titleInput.setCustomValidity('Заголовок не должен превышать 100 символов');
    } else if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Обязательное поле');
    } else {
      titleInput.setCustomValidity('');
    }
  };

  titleInput.addEventListener('invalid', function () {
    getCustomMessageTitle();
  });

  titleInput.addEventListener('input', function () {
    getCustomMessageTitle();
  });

  typeSelect.addEventListener('change', function () {
    var value = typeSelect.value;
    priceInput.min = typeToPrice[value];
    priceInput.placeholder = typeToPrice[value];
  });

  priceInput.addEventListener('invalid', function () {
    if (priceInput.validity.rangeUnderflow) {
      priceInput.setCustomValidity('Минимальная цена должна быть ' + priceInput.min);
    } else if (priceInput.validity.rangeOverflow) {
      priceInput.setCustomValidity('Максимальная цена ' + priceInput.max);
    } else if (priceInput.validity.valueMissing) {
      priceInput.setCustomValidity('Обязательное поле');
    } else {
      priceInput.setCustomValidity('');
    }
  });

  var syncInputs = function (firstElem, secondElem) {
    secondElem.value = firstElem.value;
  };

  timeIn.addEventListener('change', function () {
    syncInputs(timeIn, timeOut);
  });

  timeOut.addEventListener('change', function () {
    syncInputs(timeOut, timeIn);
  });

  var roomsAndCapacityDependence = function () {
    var capacitySelectOptions = Array.from(capacitySelect.options);
    capacitySelectOptions.forEach(function (el) {
      el.disabled = !roomsGuestsDependencies[roomsSelect.value].includes(el.value);
      el.selected = !el.disabled;
    });
  };
  roomsAndCapacityDependence();

  roomsSelect.addEventListener('change', function () {
    roomsAndCapacityDependence();
  });

  var sendSuccessForm = function () {
    window.message.success();
    window.map.deactivationPage();
  };

  adForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(adForm), sendSuccessForm, window.message.error);
    evt.preventDefault();
  });
})();
