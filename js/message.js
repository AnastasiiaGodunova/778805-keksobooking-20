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

    successCopy.addEventListener('click', onSuccesClick);
    document.addEventListener('keydown', onSuccesEscPress);

    main.appendChild(successCopy);
  };

  var onSuccesClick = function (evt) {
    var mainSuccessMessage = main.querySelector('.success');
    evt.preventDefault();
    mainSuccessMessage.remove();
  };

  var onSuccesEscPress = function (evt) {
    if (evt.key === window.const.ESCAPE_KEY) {
      onSuccesClick(evt);
    }
  };

  var onErrorClick = function (evt) {
    var mainErrorMessage = main.querySelector('.error');
    evt.preventDefault();
    mainErrorMessage.remove();
  };

  var onErrorEscPress = function (evt) {
    if (evt.key === window.const.ESCAPE_KEY) {
      onErrorClick(evt);
    }
  };

  window.message = {
    success: renderSuccess,
    error: renderError
  };
})();
