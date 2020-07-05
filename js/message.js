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

    errorButton.addEventListener('click', errorClick);
    errorCopy.addEventListener('click', errorClick);
    document.addEventListener('keydown', onErrorEscPress);

    main.appendChild(errorCopy);
  };

  var renderSuccess = function () {
    var successCopy = successMessage.cloneNode(true);

    successCopy.addEventListener('click', successClick);
    document.addEventListener('keydown', onSuccesEscPress);

    main.appendChild(successCopy);
  };

  var successClick = function () {
    var mainSuccessMessage = main.querySelector('.success');
    mainSuccessMessage.remove();
  };

  var onSuccesEscPress = function (evt) {
    if (evt.key === window.const.ESCAPE_KEY) {
      var mainSuccessMessage = main.querySelector('.success');
      evt.preventDefault();
      mainSuccessMessage.remove();
    }
  };

  var errorClick = function () {
    var mainErrorMessage = main.querySelector('.error');
    mainErrorMessage.remove();
  };

  var onErrorEscPress = function (evt) {
    if (evt.key === window.const.ESCAPE_KEY) {
      var mainErrorMessage = main.querySelector('.error');
      evt.preventDefault();
      mainErrorMessage.remove();
    }
  };

  window.message = {
    success: renderSuccess,
    error: renderError
  };
})();
