'use strict';

/* (function () {
  var mapCard = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var typeToHouse = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };*/

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
    window.map.appendChild(fragment);
  };
  renderCard();
})();*/
