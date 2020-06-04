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
  }
};

var map = document.querySelector('.map');
var mapPinsBlock = document.querySelector('.map__pins');
var mapPin = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

/* Удаляет класс*/
var removeClass = function (elem, elemClass) {
  elem.classList.remove(elemClass);
};

/* Возвращает случайное число от и до*/
var getRandomInteger = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

/* Возвращает случайный элемент массива*/
var getRandomArrElement = function (arr) {
  return arr[getRandomInteger(0, arr.length)];
};

/* Возвращает объект случайных элементов из массива*/
var getRandomArray = function (arr) {
  var randomObject = {};
  for (var i = 0; i <= getRandomInteger(1, arr.length); i++) {
    var randomElement = getRandomArrElement(arr);
    randomObject[randomElement] = true;
  }

  return Object.keys(randomObject);
};

/* Возвращает массив меток*/
var getRandomPins = function () {
  var pinsList = [];
  for (var i = 1; i <= AMOUNT_PINS; i++) {
    var x = getRandomInteger(50, 1150);
    var y = getRandomInteger(130, 630);
    var randomPin = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },

      offer: {
        title: getRandomArrElement(PIN_OBJ.title),
        address: x + ', ' + y,
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
        x: x,
        y: y
      }
    };
    pinsList.push(randomPin);
  }

  return pinsList;
};

removeClass(map, 'map--faded');

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

renderPins();
