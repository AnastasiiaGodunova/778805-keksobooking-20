'use strict';

(function () {
  var main = document.querySelector('main');
  var successMessage = document.querySelector('#success')
    .content
    .querySelector('.success');
  var errorMessage = document.querySelector('#error')
    .content
    .querySelector('.error');

  var getErrorMessage = function (errorText) {
    var errorCopy = errorMessage.cloneNode(true);
    var errorMessageText = errorCopy.querySelector('.error__message');
    var errorButton = errorCopy.querySelector('.error__button');

    errorMessageText.textContent = errorText;

    errorButton.addEventListener('click', onErrorClick);
    document.addEventListener('click', onErrorClick);
    document.addEventListener('keydown', onErrorEscPress);

    return errorCopy;
  };

  var onError = function (errorText) {
    main.appendChild(getErrorMessage(errorText));
  };

  var getSuccessMessage = function () {
    var successCopy = successMessage.cloneNode(true);

    document.addEventListener('click', onSuccesClick);
    document.addEventListener('keydown', onSuccesEscPress);

    return successCopy;
  };

  var onSuccess = function () {
    main.appendChild(getSuccessMessage());
  };

  var onSuccesClick = function (evt) {
    var mainSuccessMessage = main.querySelector('.success');
    evt.preventDefault();
    mainSuccessMessage.remove();
    window.map.deactivationPage();

    document.removeEventListener('click', onSuccesClick);
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

    document.removeEventListener('click', onErrorClick);
  };

  var onErrorEscPress = function (evt) {
    if (evt.key === window.const.ESCAPE_KEY) {
      onErrorClick(evt);
    }
  };

  window.message = {
    success: onSuccess,
    error: onError
  };
})();
