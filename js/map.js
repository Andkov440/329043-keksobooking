'use strict';

var MAIN_PIN_HEIGHT = 70;
var MAIN_PIN_WIDTH = 65;

generatePins(adverts);
var mapPinMain = document.querySelector('.map__pin--main');

var mainPinMouseupHandler = function () {
  document.querySelector('.map').classList.remove('map--faded');
  document.querySelector('.notice__form').classList.remove('notice__form--disabled');
  document.querySelector('.notice__form').elements.disabled = false;
  var pinX = mapPinMain.offsetTop + MAIN_PIN_HEIGHT;
  var pinY = mapPinMain.offsetLeft + Math.floor(MAIN_PIN_WIDTH / 2);
  formAddress.value = pinX + ', ' + pinY;
  var mapPinsAll = document.querySelectorAll('.map__pin');
  for (var i = 0; i < mapPinsAll.length; i++) {
    mapPinsAll[i].style.display = 'block';
  }
};

var pinCenterX = mapPinMain.offsetTop + MAIN_PIN_WIDTH / 2;
var pinCenterY = mapPinMain.offsetLeft + MAIN_PIN_HEIGHT / 2;

var formAddress = document.querySelector('#address');
formAddress.value = pinCenterX + ', ' + pinCenterY;

mapPinMain.addEventListener('mouseup', mainPinMouseupHandler);
