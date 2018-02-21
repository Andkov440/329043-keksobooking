'use strict';

(function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 70;
  var ENTER_KEYCODE = 13;

  window.generatePins = function (ads) {
    var mapPins = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < ADS_QUANTITY; i++) {
      var newPin = document.createElement('button');
      newPin.className = 'map__pin';
      newPin.style.left = (ads[i].location.x - PIN_WIDTH / 2) + 'px';
      newPin.style.top = (ads[i].location.y - PIN_HEIGHT) + 'px';
      newPin.innerHTML = '<img src="' + ads[i].author.avatar + '" width="40" height="40" draggable="false" offer-id="' + i + '">';
      newPin.setAttribute('offer-id', i);
      newPin.style.display = 'none';
      fragment.appendChild(newPin);
    }
    mapPins.appendChild(fragment);
  };
  var mapPins = document.querySelector('.map__pins');

  var mapPinClickHandler = function (evt) {
    var target = evt.target;
    if (target.getAttribute('offer-id')) {
      var offerId = target.getAttribute('offer-id');
      removeMapCard();
      renderAdvert(adverts[offerId]);
    }
  };

  var mapPinEnterPressHandler = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      mapPinClickHandler(evt);
    }
  };

  mapPins.addEventListener('click', mapPinClickHandler);
  mapPins.addEventListener('keydown', mapPinEnterPressHandler);

})();
