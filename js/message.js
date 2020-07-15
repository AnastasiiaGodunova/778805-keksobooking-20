'use strict';

(function () {
  var main = document.querySelector('main');
  var successMessage = document.querySelector('#success')
    .content
    .querySelector('.success');
  var errorMessage = document.querySelector('#error')
    .content
    .querySelector('.error');

  var renderError = function (errorText) {
    var errorCopy = errorMessage.cloneNode(true);
    var errorMessageText = errorCopy.querySelector('.error__message');
    var errorButton = errorCopy.querySelector('.error__button');

    errorMessageText.textContent = errorText;

    errorButton.addEventListener('click', onErrorClick);
    errorCopy.addEventListener('click', onErrorClick);
    document.addEventListener('keydown', onErrorEscPress);

    main.appendChild(errorCopy);
  };

  var renderSuccess = function () {
    var successCopy = successMessage.cloneNode(true);

    successCopy.addEventListener('click', onSuccessClick);
    document.addEventListener('keydown', onSuccessEscPress);

    main.appendChild(successCopy);
  };

  var closeSuccess = function () {
    var mainSuccessMessage = main.querySelector('.success');
    mainSuccessMessage.remove();
  };

  var onSuccessClick = function () {
    closeSuccess();
  };

  var onSuccessEscPress = function (evt) {
    if (evt.key === window.const.ESCAPE_KEY) {
      evt.preventDefault();
      closeSuccess();
    }
  };

  var closeError = function () {
    var mainErrorMessage = main.querySelector('.error');
    mainErrorMessage.remove();
  };

  var onErrorClick = function () {
    closeError();
  };

  var onErrorEscPress = function (evt) {
    if (evt.key === window.const.ESCAPE_KEY) {
      evt.preventDefault();
      closeError();
    }
  };

  window.message = {
    success: renderSuccess,
    error: renderError
  };
})();
