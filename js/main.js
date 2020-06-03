'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPinsBlock = document.querySelector('.map__pins');
var mapPin = document.querySelector('#pin')
.content
.querySelector('.map__pin');
var fragment = document.createDocumentFragment();

var titleList = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
var offerType = ['palace', 'flat', 'house', 'bungalo'];
var checkTimeList = ['12:00', '13:00', '14:00'];
var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosList = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var pinsList = [];

/* Возвращает случайный элемент массива*/
var getRandomArrElement = function (arr) {
  var random = Math.floor(Math.random() * arr.length);
  return arr[random];
};

/* Возвращает случайное число от и до*/
var getRandomInteger = function (min, max) {
  var randomInteger = min + Math.random() * (max + 1 - min);
  return Math.floor(randomInteger);
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
  for (var i = 1; i <= 8; i++) {
    var x = getRandomInteger(50, 1150);
    var y = getRandomInteger(130, 630);
    var randomPin = {
      'author': {
        'avatar': 'img/avatars/user0' + i + '.png'
      },

      'offer': {
        'title': getRandomArrElement(titleList),
        'address': x + ', ' + y,
        'price': getRandomInteger(10000, 50000),
        'type': getRandomArrElement(offerType),
        'rooms': getRandomInteger(1, 3),
        'guests': getRandomInteger(0, 2),
        'checkin': getRandomArrElement(checkTimeList),
        'checkout': getRandomArrElement(checkTimeList),
        'features': getRandomArray(featuresList),
        'description': '',
        'photos': getRandomArray(photosList)
      },

      'location': {
        'x': x,
        'y': y
      }
    };
    pinsList.push(randomPin);
  }
  return pinsList;
};
getRandomPins();

/* Отрисовывает метки*/
var renderPins = function () {
  for (var i = 0; i < pinsList.length; i++) {
    var pinElement = mapPin.cloneNode(true);
    var mapPinImg = pinElement.querySelector('img');

    pinElement.style.left = pinsList[i].location.x - 25 + 'px';
    pinElement.style.top = pinsList[i].location.y - 70 + 'px';

    mapPinImg.src = pinsList[i].author.avatar;
    mapPinImg.alt = pinsList[i].offer.title;

    fragment.appendChild(pinElement);
  }
  mapPinsBlock.appendChild(fragment);
};
renderPins();
