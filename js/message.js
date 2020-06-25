'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var main = document.querySelector('main');
  var successMessage = document.querySelector('#success')
    .content
    .querySelector('.success');
  var errorMessage = document.querySelector('#error')
    .content
    .querySelector('.error');

  /* Копирует шаблон сообщения об ошибке при отправке формы*/
  var getErrorMessage = function (errorText) {
    var errorCopy = errorMessage.cloneNode(true);
    var errorMessageText = errorCopy.querySelector('.error__message');
    errorMessageText.textContent = errorText;

    return errorCopy;
  };

  /* Отрисовывает сообщение об ошибке при отправке формы*/
  var renderErrorMessage = function () {
    var errorFragment = document.createDocumentFragment();
    errorFragment.appendChild(getErrorMessage());
    main.appendChild(errorFragment);
    document.addEventListener('click', closeMessage);
    document.addEventListener('keydown', closeMessage);
  };

  /* Открытие и закрытие сообщения об отправке формы*/
  var closeErrorMessage = function (evt) {
    var mainErrorMessage = main.querySelector('.error');
    var errorButton = main.querySelector('.error__button');
    errorButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      mainErrorMessage.remove();
    });
  };

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
    }, renderErrorMessage);
    evt.preventDefault();
    document.addEventListener('click', closeMessage);
    document.addEventListener('keydown', closeMessage);
  };

  /* Открытие и закрытие сообщения об отправке формы*/
  var closeMessage = function (evt) {
    var mainSuccessMessage = main.querySelector('.success');
    var mainErrorMessage = main.querySelector('.error');
    if (evt.key === window.const.ESCAPE_KEY || evt.button === window.const.LEFT_BTN_KEY) {
      evt.preventDefault();
      if (mainSuccessMessage) {
        mainSuccessMessage.remove();
        window.map.deactivationPage();
      }
      if (mainErrorMessage) {
        mainErrorMessage.remove();
      }
    }
    document.removeEventListener('click', closeMessage);
  };

  adForm.addEventListener('submit', renderSuccessMessage);
})();
