'use strict';


(function () {

  var typeMap = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  var cardTemplate = document.querySelector('template')
    .content
    .querySelector('.map__card');

  // определение типа жилья

  var getType = function (item) {
    return typeMap[item.offer.type] || item.offer.type;
  };

  var insertFeatures = function (container, array) {
    while (container.firstChild) {
      container.firstChild.remove();
    }
    for (var i = 0; i < array.length; i++) {
      var featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature');
      featureElement.classList.add('popup__feature--' + array[i]);
      container.appendChild(featureElement);
    }
  };

  var insertPhotos = function (container, template, array) {
    template.remove();
    for (var i = 0; i < array.length; i++) {
      var photoElement = template.cloneNode();
      photoElement.src = array[i];
      container.appendChild(photoElement);
    }
  };

  window.renderCard = function (item) {
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__avatar').src = item.author.avatar;
    cardElement.querySelector('.popup__title').textContent = item.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = item.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = item.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = getType(item);
    cardElement.querySelector('.popup__text--capacity').textContent = item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после  ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = item.offer.description;

    var featuresContainer = cardElement.querySelector('.popup__features');
    insertFeatures(featuresContainer, item.offer.features);

    var photosContainer = cardElement.querySelector('.popup__photos');
    var photoTemplate = cardElement.querySelector('.popup__photo');
    insertPhotos(photosContainer, photoTemplate, item.offer.photos);

    return cardElement;
  };

})();
