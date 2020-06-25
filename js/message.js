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
    var mainErrorMessage = errorCopy.querySelector('.error');
    var errorButton = errorCopy.querySelector('.error__button');

    errorMessageText.textContent = errorText;
    errorButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      mainErrorMessage.remove();
    });

    return errorCopy;
  };

  /* Отрисовывает сообщение об ошибке при отправке формы*/
  var renderErrorMessage = function (errorText) {
    main.appendChild(getErrorMessage(errorText));
    document.addEventListener('click', onErrorMessageClose);
    document.addEventListener('keydown', onErrorMessageClose);
  };

  /* Копирует шаблон сообщения об успешной отправке формы*/
  var getSuccessMessage = function () {
    var successCopy = successMessage.cloneNode(true);

    return successCopy;
  };

  /* Отрисовывает сообщение об успешной отправке формы*/
  var renderSuccessMessage = function (evt) {
    window.backend.save(new FormData(adForm), function () {
      main.appendChild(getSuccessMessage());
    }, renderErrorMessage);
    evt.preventDefault();
    document.addEventListener('click', onSuccesMessageClose);
    document.addEventListener('keydown', onSuccesMessageClose);
  };

  var onSuccesMessageClose = function (evt) {
    var mainSuccessMessage = main.querySelector('.success');
    if (evt.key === window.const.ESCAPE_KEY || evt.button === window.const.LEFT_BTN_KEY) {
      evt.preventDefault();
      mainSuccessMessage.remove();
      window.map.deactivationPage();
    }
    document.removeEventListener('click', onSuccesMessageClose);
  };

  /* Открытие и закрытие сообщения об отправке формы*/
  var onErrorMessageClose = function (evt) {
    var mainErrorMessage = main.querySelector('.error');
    if (evt.key === window.const.ESCAPE_KEY || evt.button === window.const.LEFT_BTN_KEY) {
      evt.preventDefault();
      mainErrorMessage.remove();
    }
    document.removeEventListener('click', onErrorMessageClose);
  };

  window.message = {
    renderMessage: renderSuccessMessage
  };
})();
