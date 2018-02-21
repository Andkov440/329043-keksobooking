'use strict';

(function () {
  var map = document.querySelector('.map');
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  window.renderAdvert = function (advert) {
    var cloneTemplate = document.querySelector('template').cloneNode(true);
    var advertTemplate = cloneTemplate.content.querySelector('.map__card');

    var mapFiltersContainer = document.querySelector('.map__filters-container');
    advertTemplate.querySelector('h3').textContent = advert.offer.title;
    advertTemplate.querySelector('small').textContent = advert.offer.address;
    advertTemplate.querySelector('.popup__price').textContent = advert.offer.price + ' &#x20bd;/ночь';
    advertTemplate.querySelector('h4').textContent = HOUSE_TYPES[advert.offer.type];
    advertTemplate.querySelector('p:nth-child(7)').textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
    advertTemplate.querySelector('p:nth-child(8)').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    advertTemplate.querySelector('p:last-of-type').textContent = advert.offer.description;
    advertTemplate.querySelector('.popup__avatar').src = advert.author.avatar;
    map.insertBefore(advertTemplate, mapFiltersContainer);

    removeChildren(document.querySelector('.popup__features'));
    for (var i = 0; i < advert.offer.features.length; i++) {
      document.querySelector('.popup__features').innerHTML += '<li class="feature feature--' + advert.offer.features[i] + '"></li>';
    }

    removeChildren(document.querySelector('.popup__pictures'));
    for (i = 0; i < advert.offer.photos.length; i++) {
      document.querySelector('.popup__pictures').innerHTML += '<li><img src="' + advert.offer.photos[i] + '" width="50" height="50"></li>';
    }

    var closePopup = document.querySelector('.popup__close');

    closePopup.addEventListener('click', removeMapCard);
    closePopup.addEventListener('keydown', popupEnterPressHandler);
    document.addEventListener('keydown', popupEscPressHandler);
  };

  var popupEnterPressHandler = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      removeMapCard();
    }
  };

  var popupEscPressHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      removeMapCard();
    }
  };

  window.removeMapCard = function () {
    var mapCard = map.querySelector('.map__card');
    if (mapCard) {
      var closePopup = document.querySelector('.popup__close');
      closePopup.removeEventListener('click', removeMapCard);
      closePopup.removeEventListener('keydown', popupEnterPressHandler);
      document.removeEventListener('keydown', popupEscPressHandler);
      map.removeChild(mapCard);
    }
  };
})();
