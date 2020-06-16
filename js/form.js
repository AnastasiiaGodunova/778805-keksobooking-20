'use strict';

(function () {
  window.form = {
    adForm: document.querySelector('.ad-form'),
    mapPinsBlock: document.querySelector('.map__pins'),

    /* Блокирует форму*/
    setDisabled: function (arr) {
      for (var i = 0; i < arr.length; i++) {
        arr[i].disabled = !arr[i].disabled;
      }
    },
    /* Возвращает адрес метки*/
    getAddressPin: function (obj, y) {
      var posX = Math.round(obj.offsetLeft + obj.offsetWidth / 2);
      var posY = Math.round(obj.offsetTop + obj.offsetHeight / y);
      addressInput.value = posX + ', ' + posY;
    },
  };

  window.adFormElements = window.form.adForm.querySelectorAll('.ad-form__element');
  window.mapPinMain = window.form.mapPinsBlock.querySelector('.map__pin--main');

  var priceOfType = {
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

  var titleInput = window.form.adForm.querySelector('input[name=title]');
  var addressInput = window.form.adForm.querySelector('input[name=address]');
  var typeSelect = window.form.adForm.querySelector('select[name=type]');
  var priceInput = window.form.adForm.querySelector('input[name=price]');
  var timeIn = window.form.adForm.querySelector('select[name=timein]');
  var timeOut = window.form.adForm.querySelector('select[name=timeout]');
  var roomsSelect = window.form.adForm.querySelector('select[name=rooms]');
  var capacitySelect = window.form.adForm.querySelector('select[name=capacity]');

  window.form.setDisabled(window.adFormElements);
  window.form.getAddressPin(window.mapPinMain, 2);

  /* Кастомные сообщения для заголовка*/
  var castomMessageTitle = function () {
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

  /* Выводит кастомные сообщения в поле заголовка*/
  titleInput.addEventListener('invalid', function () {
    castomMessageTitle();
  });

  titleInput.addEventListener('input', function () {
    castomMessageTitle();
  });

  /* Меняет минимальную цену в зависимости от типа жилья*/
  typeSelect.addEventListener('change', function () {
    var value = typeSelect.value;
    priceInput.min = priceOfType[value];
    priceInput.placeholder = priceOfType[value];
  });

  /* Выводит кастомные сообщения в поле цены*/
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

  /* Синхронизирует значение 2ух элементов*/
  var syncInputs = function (firstElem, secondElem) {
    secondElem.value = firstElem.value;
  };

  timeIn.addEventListener('change', function () {
    syncInputs(timeIn, timeOut);
  });

  timeOut.addEventListener('change', function () {
    syncInputs(timeOut, timeIn);
  });

  /* Выбор кол-ва комнат и гостей*/
  var roomsAndCapacityDependence = function () {
    var capacitySelectOptions = capacitySelect.options;
    for (var i = 0; i < capacitySelectOptions.length; i++) {
      capacitySelectOptions[i].disabled = !roomsGuestsDependencies[roomsSelect.value].includes(capacitySelectOptions[i].value);
      capacitySelectOptions[i].selected = !capacitySelectOptions[i].disabled;
    }
  };
  roomsAndCapacityDependence();

  roomsSelect.addEventListener('change', function () {
    roomsAndCapacityDependence();
  });
})();
