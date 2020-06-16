'use strict';

(function () {
  var AMOUNT_PINS = 8;
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

  /* Возвращает массив меток*/
  var getRandomPins = function () {
    var pinsList = [];
    for (var i = 1; i <= AMOUNT_PINS; i++) {
      var randomPin = {
        author: {
          avatar: 'img/avatars/user0' + i + '.png'
        },

        offer: {
          title: window.utils.getRandomArrElement(PIN_OBJ.title),
          address: window.utils.getRandomInteger(PIN_OBJ.x.min, PIN_OBJ.x.max) + ', '
                  + window.utils.getRandomInteger(PIN_OBJ.y.min, PIN_OBJ.y.max),
          price: window.utils.getRandomInteger(PIN_OBJ.price.min, PIN_OBJ.price.max),
          type: window.utils.getRandomArrElement(PIN_OBJ.type),
          rooms: window.utils.getRandomInteger(PIN_OBJ.rooms.min, PIN_OBJ.rooms.max),
          guests: window.utils.getRandomInteger(PIN_OBJ.guests.min, PIN_OBJ.guests.max),
          checkin: window.utils.getRandomArrElement(PIN_OBJ.checkTime),
          checkout: window.utils.getRandomArrElement(PIN_OBJ.checkTime),
          features: window.utils.getRandomArray(PIN_OBJ.features),
          description: '',
          photos: window.utils.getRandomArray(PIN_OBJ.photos)
        },

        location: {
          x: window.utils.getRandomInteger(PIN_OBJ.x.min, PIN_OBJ.x.max),
          y: window.utils.getRandomInteger(PIN_OBJ.y.min, PIN_OBJ.y.max)
        }
      };
      pinsList.push(randomPin);
    }

    return pinsList;
  };

  window.data = {
    getRandomPins: getRandomPins()
  };
})();
