'use strict';

(function () {
  var MAIN_PIN_HEIGHT = 70;
  var MAIN_PIN_WIDTH = 65;
  var TOP_LIMIT = 150;
  var BOTTOM_LIMIT = 500;


  var mapPinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');

  var mainPinMouseUpHandler = function () {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.notice__form').classList.remove('notice__form--disabled');
    document.querySelector('.notice__form').elements.disabled = false;
    var pinY = mapPinMain.offsetTop + MAIN_PIN_HEIGHT;
    var pinX = mapPinMain.offsetLeft + Math.floor(MAIN_PIN_WIDTH / 2);
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

  var mainPinMouseDownHandler = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mainPinMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var limits = {
        right: map.offsetWidth,
        left: mapPinMain.offsetWidth,
        top: map.offsetTop + TOP_LIMIT,
        bottom: map.offsetTop + BOTTOM_LIMIT
      };

      var pinY = mapPinMain.offsetTop + MAIN_PIN_HEIGHT;
      var pinX = mapPinMain.offsetLeft + Math.floor(MAIN_PIN_WIDTH / 2);

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if ((pinX - shift.x <= limits.right) && (pinX - shift.x >= limits.left)) {
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      }
      if ((pinY - shift.y <= limits.bottom) && (pinY - shift.y >= limits.top)) {
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      var pinY = mapPinMain.offsetTop + MAIN_PIN_HEIGHT;
      var pinX = mapPinMain.offsetLeft + Math.floor(MAIN_PIN_WIDTH / 2);
      formAddress.value = pinX + ', ' + pinY;
      document.removeEventListener('mousemove', mainPinMouseMoveHandler);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', mainPinMouseMoveHandler);
    document.addEventListener('mouseup', onMouseUp);
  };

  mapPinMain.addEventListener('mouseup', mainPinMouseUpHandler);
  mapPinMain.addEventListener('mousedown', mainPinMouseDownHandler);
})();
