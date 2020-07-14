'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapCard = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var typeToHouse = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  var getFillFeatures = function (arr, block) {
    var featureFragment = document.createDocumentFragment();

    block.innerHTML = '';

    arr.forEach(function (el) {
      var featureItem = document.createElement('li');
      featureItem.classList.add('popup__feature', 'popup__feature--' + el);
      featureFragment.appendChild(featureItem);
    });

    block.appendChild(featureFragment);
  };

  var getFillPhotos = function (arr, block) {
    var photoFragment = document.createDocumentFragment();

    block.innerHTML = '';

    arr.forEach(function (el) {
      var photoImg = document.createElement('img');
      photoImg.src = el;
      photoImg.width = 45;
      photoImg.alt = 'Фотография жилья';
      photoImg.classList.add('popup__photo');

      photoFragment.appendChild(photoImg);
    });

    block.appendChild(photoFragment);
  };

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
    var popupClose = cardCopy.querySelector('.popup__close');

    title.textContent = obj.offer.title;
    address.textContent = obj.offer.address;
    price.textContent = obj.offer.price + '₽/ночь';
    type.textContent = typeToHouse[obj.offer.type];
    capacity.textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
    time.textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
    getFillFeatures(obj.offer.features, featuresList);
    description.textContent = obj.offer.description;
    getFillPhotos(obj.offer.photos, photos);
    avatar.src = obj.author.avatar;

    popupClose.addEventListener('click', function (evt) {
      evt.preventDefault();
      removeCard();
    });

    document.addEventListener('keydown', onCardEscPress);

    return cardCopy;
  };

  var onCardEscPress = function (evt) {
    if (evt.key === window.const.ESCAPE_KEY) {
      evt.preventDefault();
      removeCard();
    }
  };

  var renderCard = function (arr) {
    map.appendChild(getFillCard(arr));
  };

  var removeCard = function () {
    document.removeEventListener('keydown', onCardEscPress);

    var card = map.querySelector('.map__card');
    if (map.contains(card)) {
      map.removeChild(card);
    }
  };

  window.card = {
    render: renderCard,
    remove: removeCard
  };
})();
