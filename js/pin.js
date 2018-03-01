'use strict';

(function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 70;
  var DEBOUNCE_INTERVAL = 500; // ms
  var mapPins = document.querySelector('.map__pins');


  window.generatePins = function (ads) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < ads.length; i++) {
      var newPin = document.createElement('button');
      newPin.className = 'map__pin';
      newPin.style.left = (ads[i].location.x - PIN_WIDTH / 2) + 'px';
      newPin.style.top = (ads[i].location.y - PIN_HEIGHT) + 'px';
      newPin.innerHTML = '<img src="' + ads[i].author.avatar + '" width="40" height="40" draggable="false" offer-id="' + i + '">';
      newPin.setAttribute('offer-id', i);
      fragment.appendChild(newPin);
    }
    mapPins.appendChild(fragment);
  };

  window.removePins = function () {
    var mapPinsElements = mapPins.children;
    for (var i = mapPinsElements.length - 1; i >= 0; i--) {
      if (mapPinsElements[i].hasAttribute('offer-id')) {
        mapPins.removeChild(mapPinsElements[i]);
      }
    }
  };

  var lastTimeout;
  var debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  };

  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');
  var checkboxFeatures = housingFeatures.querySelectorAll('input[type="checkbox"]');

  // Массив на основании которого мы будем рендерить пины
  window.filteredOffers = window.data;

  // Функции фильтрации для каждого типа
  var byHouseType = function (ad) {
    return housingType.value === 'any' ? true : housingType.value === ad.offer.type;
  };

  var byPrice = function (ad) {
    switch (housingPrice.value) {
      case 'low':
        return ad.offer.price < 10000;
      case 'middle':
        return (ad.offer.price >= 10000) && (ad.offer.price <= 50000);
      case 'high':
        return ad.offer.price > 50000;
      default:
        return true;
    }
  };

  var byRooms = function (ad) {
    return housingRooms.value === 'any' ? true : +housingRooms.value === ad.offer.rooms;
  };

  var byGuests = function (ad) {
    return housingGuests.value === 'any' ? true : +housingGuests.value === ad.offer.guests;
  };

  var byFeatures = function (ad) {
    var checkedFeatures = [];
    for (var i = 0; i < checkboxFeatures.length; i++) {
      if (checkboxFeatures[i].checked) {
        checkedFeatures.push(checkboxFeatures[i].value);
      }
    }
    var isFeature = checkedFeatures.every(function (num) {
      return ad.offer.features.indexOf(num) !== -1;
    });
    return isFeature;
  };

  var filterPins = function () {
    window.removePins();
    window.filteredOffers = window.data.filter(byHouseType).filter(byPrice).filter(byRooms).filter(byGuests).filter(byFeatures);
    debounce(window.generatePins(window.filteredOffers));
  };

  housingType.addEventListener('change', filterPins);
  housingPrice.addEventListener('change', filterPins);
  housingRooms.addEventListener('change', filterPins);
  housingGuests.addEventListener('change', filterPins);
  housingFeatures.addEventListener('change', filterPins);

  var mapPinClickHandler = function (evt) {
    var target = evt.target;
    if (target.getAttribute('offer-id')) {
      var offerId = target.getAttribute('offer-id');
      window.card.removeMapCard();
      window.card.renderAdvert(window.filteredOffers[offerId]);
    }
  };

  var mapPinEnterPressHandler = function (evt) {
    if (evt.keyCode === window.map.ENTER_KEYCODE) {
      mapPinClickHandler(evt);
    }
  };

  mapPins.addEventListener('click', mapPinClickHandler);
  mapPins.addEventListener('keydown', mapPinEnterPressHandler);
})();
