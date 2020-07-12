'use strict';
(function () {
  var LOAD = 'https://javascript.pages.academy/keksobooking/data';
  var SAVE = 'https://javascript.pages.academy/keksobooking';
  var TIMEOUT_IN_MS = 10000;

  var StatusCode = {
    OK: 200
  };

  var makeRequest = function (method, url, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open(method, url);
    xhr.send(data);
  };

  var save = function (data, onLoad, onError) {
    makeRequest('POST', SAVE, onLoad, onError, data);
  };

  var load = function (onLoad, onError) {
    makeRequest('GET', LOAD, onLoad, onError);
  };

  window.backend = {
    load: load,
    save: save,
    makeRequest: makeRequest
  };
})();
