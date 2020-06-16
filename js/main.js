'use strict';

var AMOUNT_PINS = 8;
var PIN_HEIGHT = 40;
var PIN_WIDTH = 40;
var LEFT_BTN_KEY = 0;
var ENTER_KEY = 'Enter';

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
/* var mapCard = document.querySelector('#card')
  .content
  .querySelector('.map__card');
var typeToHouse = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец'
};*/
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
var mapPinMain = mapPinsBlock.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFormElements = adForm.querySelectorAll('.ad-form__element');
var titleInput = adForm.querySelector('input[name=title]');
var addressInput = adForm.querySelector('input[name=address]');
var typeSelect = adForm.querySelector('select[name=type]');
var priceInput = adForm.querySelector('input[name=price]');
var timeIn = adForm.querySelector('select[name=timein]');
var timeOut = adForm.querySelector('select[name=timeout]');
var roomsSelect = adForm.querySelector('select[name=rooms]');
var capacitySelect = adForm.querySelector('select[name=capacity]');
var formReset = adForm.querySelector('.ad-form__reset');

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
  pinElement.style.top = obj.location.y - PIN_HEIGHT / 2 + 'px';

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

/* Возвращает адрес метки*/
var getAddressPin = function (obj, y) {
  var posX = Math.round(obj.offsetLeft + obj.offsetWidth / 2);
  var posY = Math.round(obj.offsetTop + obj.offsetHeight / y);
  addressInput.value = posX + ', ' + posY;
};
getAddressPin(mapPinMain, 2);

/* Блокирует форму*/
var setDisabled = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].disabled = !arr[i].disabled;
  }
};
setDisabled(adFormElements);

/* Активное состояние страницы*/
var activationPage = function () {
  removeClass(map, 'map--faded');
  removeClass(adForm, 'ad-form--disabled');

  renderPins();
  setDisabled(adFormElements);

  getAddressPin(mapPinMain, 1);
};

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === LEFT_BTN_KEY) {
    evt.preventDefault();
    activationPage();
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    evt.preventDefault();
    activationPage();
  }
});

/* Удаляет метки*/
var removePins = function () {
  var mapPins = mapPinsBlock.querySelectorAll('.map__pin');
  for (var i = 0; i < mapPins.length; i++) {
    if (!mapPins[i].classList.contains('map__pin--main')) {
      mapPins[i].remove();
    }
  }
};

/* Возвращает страницу в неактивное состояние*/
var deactivationPage = function () {
  map.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');
  adForm.reset();
  setDisabled(adFormElements);
  removePins();
  getAddressPin(mapPinMain, 2);
};

formReset.addEventListener('click', function (evt) {
  evt.preventDefault();
  deactivationPage();
});

/* Возвращает список удобств*/
/* var getFillFeature = function (arr, block) {
  var featureFragment = document.createDocumentFragment();

  block.innerHTML = '';

  for (var i = 0; i < arr.length; i++) {
    var featureItem = document.createElement('li');
    featureItem.classList.add('popup__feature', 'popup__feature--' + arr[i]);
    featureFragment.appendChild(featureItem);
  }

  block.appendChild(featureFragment);
};*/

/* Возвращает список фото жилья*/
/* var getFillPhoto = function (arr, block) {
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
};*/

/* Возвращает заполненное объявление*/
/* var getFillCard = function (obj) {
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
};*/

/* Отрисовывает объявление*/
/* var renderCard = function () {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(getFillCard(pins[0]));
  map.appendChild(fragment);
};
renderCard();*/

/* Кастомные сообщения для заголовка*/
var castomMessageTitle = function () {
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
  castomMessageTitle();
});

titleInput.addEventListener('input', function () {
  castomMessageTitle();
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
