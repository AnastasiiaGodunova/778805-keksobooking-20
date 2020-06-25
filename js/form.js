'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
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

  var titleInput = adForm.querySelector('input[name=title]');
  var typeSelect = adForm.querySelector('select[name=type]');
  var priceInput = adForm.querySelector('input[name=price]');
  var timeIn = adForm.querySelector('select[name=timein]');
  var timeOut = adForm.querySelector('select[name=timeout]');
  var roomsSelect = adForm.querySelector('select[name=rooms]');
  var capacitySelect = adForm.querySelector('select[name=capacity]');

  /* Кастомные сообщения для заголовка*/
  var getCastomMessageTitle = function () {
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
    getCastomMessageTitle();
  });

  titleInput.addEventListener('input', function () {
    getCastomMessageTitle();
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

  var main = document.querySelector('main');
  var successMessage = document.querySelector('#success')
    .content
    .querySelector('.success');
  var errorMessage = document.querySelector('#error')
    .content
    .querySelector('.error');
  var mainErrorMessage = main.querySelector('.error');
  var errorButton = mainErrorMessage.querySelector('.error__button');

  /* Копирует шаблон сообщения об успешной отправке формы*/
  var getSuccessMessage = function () {
    var successCopy = successMessage.cloneNode(true);

    return successCopy;
  };

  /* Отрисовывает сообщение об успешной отправке формы*/
  var renderSuccessMessage = function (evt) {
    window.backend.save(new FormData(adForm), function () {
      var successFragment = document.createDocumentFragment();
      successFragment.appendChild(getSuccessMessage());
      main.appendChild(successFragment);
    });
    evt.preventDefault();
    window.map.deactivationPage();
    document.addEventListener('click', closeSuccessMessage, closeErrorMessage);
  };

  /* Открытие и закрытие сообщения об отправке формы*/
  var closeSuccessMessage = function (evt) {
    var mainSuccessMessage = main.querySelector('.success');
    if (evt.key === 'Escape' || evt.button === window.const.LEFT_BTN_KEY) {
      evt.preventDefault();
      mainSuccessMessage.remove();
    }
    document.removeEventListener('click', closeSuccessMessage, closeErrorMessage);
  };

  /* Копирует шаблон сообщения об ошибке при отправке формы*/
  var getErrorMessage = function () {
    var errorCopy = errorMessage.cloneNode(true);

    return errorCopy;
  };

  /* Отрисовывает сообщение об ошибке при отправке формы*/
  var renderErrorMessage = function (evt) {
    var errorFragment = document.createDocumentFragment();
    errorFragment.appendChild(getErrorMessage());
    main.appendChild(errorFragment);
    evt.preventDefault();
  };

  /* Открытие и закрытие сообщения об отправке формы*/
  var closeErrorMessage = function (evt) {
    if (evt.key === 'Escape' || evt.button === window.const.LEFT_BTN_KEY) {
      evt.preventDefault();
      mainErrorMessage.remove();
    }
  };

  errorButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    mainErrorMessage.remove();
  });

  adForm.addEventListener('submit', renderSuccessMessage, renderErrorMessage);
  document.addEventListener('keydown', closeSuccessMessage, closeErrorMessage);
})();
