'use strict';

var AMOUNT_PINS = 8;
var PIN_HEIGHT = 70;
var PIN_WIDTH = 50;

var PIN_OBJ = {
  title: ['Дворец', 'Квартира', 'Дом', 'Бунгало'],
  type: ['palace', 'flat', 'house', 'bungalo'],
  checkTime: ['12:00', '13:00', '14:00'],
  features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],

  price: {
    min: 10000,
    max: 50000
  },

  rooms: {
    min: 1,
    max: 3
  },

  guests: {
    min: 0,
    max: 2
  },

  x: {
    min: 50,
    max: 1150
  },

  y: {
    min: 130,
    max: 630
  }
};

var map = document.querySelector('.map');
var mapPinsBlock = document.querySelector('.map__pins');
var mapPin = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var mapCard = document.querySelector('#card')
  .content
  .querySelector('.map__card');
var typeToHouse = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец'
};
var mapPinMain = mapPinsBlock.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var addressInput = adForm.querySelector('input[name=address]');
var typeSelect = adForm.querySelector('select[name=type]');
var priceInput = adForm.querySelector('input[name=price]');
var timeIn = adForm.querySelector('select[name=timein]');
var timeOut = adForm.querySelector('select[name=timeout]');
var roomsSelect = adForm.querySelector('select[name=rooms]');
var capacitySelect = adForm.querySelector('select[name=capacity]');
var formSubmit = adForm.querySelector('.ad-form__submit');
var formReset = adForm.querySelector('.ad-form__reset');
var main = document.querySelector('main');
var successMessage = document.querySelector('#success')
  .content
  .querySelector('.success');
var errorMessage = document.querySelector('#error')
  .content
  .querySelector('.error');

/* Удаляет класс*/
var removeClass = function (elem, elemClass) {
  elem.classList.remove(elemClass);
};

/* Возвращает случайное число от и до*/
var getRandomInteger = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
};

/* Возвращает случайный элемент массива*/
var getRandomArrElement = function (arr) {
  return arr[getRandomInteger(0, arr.length - 1)];
};

/* Возвращает объект случайных элементов из массива*/
var getRandomArray = function (arr) {
  var randomObject = {};
  for (var i = 0; i <= getRandomInteger(1, arr.length - 1); i++) {
    var randomElement = getRandomArrElement(arr);
    randomObject[randomElement] = true;
  }

  return Object.keys(randomObject);
};

/* Возвращает массив меток*/
var getRandomPins = function () {
  var pinsList = [];
  for (var i = 1; i <= AMOUNT_PINS; i++) {
    var randomPin = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },

      offer: {
        title: getRandomArrElement(PIN_OBJ.title),
        address: getRandomInteger(PIN_OBJ.x.min, PIN_OBJ.x.max) + ', '
               + getRandomInteger(PIN_OBJ.y.min, PIN_OBJ.y.max),
        price: getRandomInteger(PIN_OBJ.price.min, PIN_OBJ.price.max),
        type: getRandomArrElement(PIN_OBJ.type),
        rooms: getRandomInteger(PIN_OBJ.rooms.min, PIN_OBJ.rooms.max),
        guests: getRandomInteger(PIN_OBJ.guests.min, PIN_OBJ.guests.max),
        checkin: getRandomArrElement(PIN_OBJ.checkTime),
        checkout: getRandomArrElement(PIN_OBJ.checkTime),
        features: getRandomArray(PIN_OBJ.features),
        description: '',
        photos: getRandomArray(PIN_OBJ.photos)
      },

      location: {
        x: getRandomInteger(PIN_OBJ.x.min, PIN_OBJ.x.max),
        y: getRandomInteger(PIN_OBJ.y.min, PIN_OBJ.y.max)
      }
    };
    pinsList.push(randomPin);
  }

  return pinsList;
};

var pins = getRandomPins();

/* Возвращает заполнунную метку*/
var getFillPin = function (obj) {
  var pinElement = mapPin.cloneNode(true);
  var mapPinImg = pinElement.querySelector('img');

  pinElement.style.left = obj.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = obj.location.y - PIN_HEIGHT + 'px';

  mapPinImg.src = obj.author.avatar;
  mapPinImg.alt = obj.offer.title;

  return pinElement;
};

/* Отрисовывает метки*/
var renderPins = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(getFillPin(pins[i]));
  }
  mapPinsBlock.appendChild(fragment);
};

/* Блокирует форму*/
var disabledForm = function () {
  var adFormElements = adForm.querySelectorAll('.ad-form__element');
  if (adForm.classList.contains('ad-form--disabled')) {
    for (var i = 0; i < adFormElements.length; i++) {
      adFormElements[i].disabled = true;
    }
  } else {
    for (var j = 0; j < adFormElements.length; j++) {
      adFormElements[j].disabled = false;
    }
  }
};
disabledForm();

/* Активное состояние страницы*/
var activationPage = function () {
  removeClass(map, 'map--faded');
  removeClass(adForm, 'ad-form--disabled');

  renderPins();
  disabledForm();

  addressInput.value = mapPinMain.style.left + ' ' + mapPinMain.style.top;
};

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.which === 1) {
    evt.preventDefault();
    activationPage();
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    evt.preventDefault();
    activationPage();
  }
});

/* Возвращает страницу в неактивное состояние*/
var deactivationPage = function () {
  var mapPins = mapPinsBlock.querySelectorAll('.map__pin');
  map.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');
  adForm.reset();
  disabledForm();
  for (var i = 0; i < mapPins.length; i++) {
    if (!mapPins[i].classList.contains('map__pin--main')) {
      mapPins[i].remove();
    }
  }
};

formReset.addEventListener('click', function (evt) {
  if (evt.which === 1) {
    evt.preventDefault();
    deactivationPage();
  }
});

formReset.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    evt.preventDefault();
    deactivationPage();
  }
});

/* Копирует шаблон сообщения об успешной отправке формы*/
var getSuccessMessage = function () {
  var successCopy = successMessage.cloneNode(true);

  return successCopy;
};

/* Отрисовывает сообщение об успешной отправке формы*/
var renderSuccessMessage = function () {
  var successFragment = document.createDocumentFragment();
  successFragment.appendChild(getSuccessMessage());
  main.appendChild(successFragment);
};

/* Открытие и закрытие сообщения об отправке формы*/
var closeSuccessMessage = function (evt) {
  var mainSuccessMessage = main.querySelector('.success');
  if (evt.key === 'Escape') {
    evt.preventDefault();
    mainSuccessMessage.remove();
  }
};

var openSuccessMessage = function () {
  renderSuccessMessage();

  document.addEventListener('keydown', closeSuccessMessage);
};

formSubmit.addEventListener('click', function (evt) {
  if (evt.which === 1) {
    evt.preventDefault();
    openSuccessMessage();
  }
});

formSubmit.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    evt.preventDefault();
    openSuccessMessage();
  }
});

/* Копирует шаблон сообщения об ошибке при отправке формы*/
var getErrorMessage = function () {
  var errorCopy = errorMessage.cloneNode(true);

  return errorCopy;
};

/* Отрисовывает сообщение об ошибке при отправке формы*/
var renderErrorMessage = function () {
  var errorFragment = document.createDocumentFragment();
  errorFragment.appendChild(getErrorMessage());
  main.appendChild(errorFragment);
};

/* Открытие и закрытие сообщения об отправке формы*/
var closeErrorMessage = function (evt) {
  var mainErrorMessage = main.querySelector('.error');
  if (evt.key === 'Escape') {
    evt.preventDefault();
    mainErrorMessage.remove();
  }
};

var openErrorMessage = function () {
  renderErrorMessage();

  document.addEventListener('keydown', closeErrorMessage);
};

formSubmit.addEventListener('click', function (evt) {
  if (evt.which === 1) {
    evt.preventDefault();
    openErrorMessage();
  }
});

formSubmit.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    evt.preventDefault();
    openErrorMessage();
  }
});

/* Возвращает список удобств*/
var getFillFeature = function (arr, block) {
  var featureFragment = document.createDocumentFragment();

  block.innerHTML = '';

  for (var i = 0; i < arr.length; i++) {
    var featureItem = document.createElement('li');
    featureItem.classList.add('popup__feature', 'popup__feature--' + arr[i]);
    featureFragment.appendChild(featureItem);
  }

  block.appendChild(featureFragment);
};

/* Возвращает список фото жилья*/
var getFillPhoto = function (arr, block) {
  var photoFragment = document.createDocumentFragment();

  block.innerHTML = '';

  for (var i = 0; i < arr.length; i++) {
    var photoImg = document.createElement('img');
    photoImg.src = arr[i];
    photoImg.width = 45;
    photoImg.alt = 'Фотография жилья';
    photoImg.classList.add('popup__photo');

    photoFragment.appendChild(photoImg);
  }

  block.appendChild(photoFragment);
};

/* Возвращает заполненное объявление*/
var getFillCard = function (obj) {
  var cardCopy = mapCard.cloneNode(true);

  var title = cardCopy.querySelector('.popup__title');
  var address = cardCopy.querySelector('.popup__text--address');
  var price = cardCopy.querySelector('.popup__text--price');
  var type = cardCopy.querySelector('.popup__type');
  var capacity = cardCopy.querySelector('.popup__text--capacity');
  var time = cardCopy.querySelector('.popup__text--time');
  var featuresList = cardCopy.querySelector('.popup__features');
  var description = cardCopy.querySelector('.popup__description');
  var photos = cardCopy.querySelector('.popup__photos');
  var avatar = cardCopy.querySelector('.popup__avatar');

  title.textContent = obj.offer.title;
  address.textContent = obj.offer.address;
  price.textContent = obj.offer.price + '₽/ночь';
  type.textContent = typeToHouse[obj.offer.type];
  capacity.textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
  time.textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
  getFillFeature(obj.offer.features, featuresList);
  description.textContent = obj.offer.description;
  getFillPhoto(obj.offer.photos, photos);
  avatar.src = obj.author.avatar;

  return cardCopy;
};

/* Отрисовывает объявление*/
/* var renderCard = function () {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(getFillCard(pins[0]));
  map.appendChild(fragment);
};
renderCard();*/

/* Меняет минимальную цену в зависимости от типа жилья*/
typeSelect.addEventListener('change', function () {
  if (typeSelect.value === 'bungalo') {
    priceInput.min = '0';
    priceInput.placeholder = '0';
  } else if (typeSelect.value === 'flat') {
    priceInput.min = '1000';
    priceInput.placeholder = '1000';
  } else if (typeSelect.value === 'house') {
    priceInput.min = '5000';
    priceInput.placeholder = '5000';
  } else if (typeSelect.value === 'palace') {
    priceInput.min = '10000';
    priceInput.placeholder = '10000';
  }
});

addressInput.value = mapPinMain.style.left + ' ' + mapPinMain.style.top;

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

roomsSelect.addEventListener('change', function () {
  var capacitySelectOptions = capacitySelect.options;
  for (var i = 0; i < capacitySelectOptions.length; i++) {
    if (roomsSelect.value < capacitySelectOptions[i].value) {
      capacitySelectOptions[i].disabled = true;
    }
  }
});
