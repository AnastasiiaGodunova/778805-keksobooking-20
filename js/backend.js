'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking';
  var StatusCode = {
    OK: 200
  };
  var messageOfError = {
    400: 'Неверный запрос',
    401: 'Пользователь не авторизирован',
    403: 'Доступ запрещен',
    404: 'Ничего не найдено',
    500: 'Внутренняя ошибка сервера'
  };
  var TIMEOUT_IN_MS = 10000;

  var xhrCreate = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + messageOfError[xhr.status]);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    return xhr;
  };

  var load = function (upload, error) {
    var xhr = xhrCreate(upload, error);

    xhr.open('GET', URL + '/data');
    xhr.send();
  };

  var save = function (data, upload, error) {
    var xhr = xhrCreate(upload, error);

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
