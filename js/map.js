'use strict';

(function () {
  var MAIN_PIN_HEIGHT = 70;
  var MAIN_PIN_WIDTH = 65;


  var mapPinMain = document.querySelector('.map__pin--main');
  window.map = document.querySelector('.map');

  var mainPinMouseUpHandler = function () {
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

  var mainPinHandleHandler = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mainPinMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var limits = {
        top: window.map.offsetTop + mapPinMain.offsetWidth,
        right: window.map.offsetWidth + window.map.offsetLeft - mapPinMain.offsetWidth,
        bottom: window.map.offsetHeight + window.map.offsetTop - mapPinMain.offsetHeight,
        left: window.map.offsetLeft + mapPinMain.offsetWidth
      };


      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };


      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (startCoords.x > limits.right) {
        startCoords.x = limits.right + 'px';
      }
      if (startCoords.x < limits.left) {
        startCoords.x = limits.left + 'px';
      }
      if (startCoords.y > limits.bottom) {
        startCoords.y = limits.bottom + 'px';
      }
      if (startCoords.y < limits.top) {
        startCoords.y = limits.top + 'px';
      }

      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mainPinMouseMoveHandler);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', mainPinMouseMoveHandler);
    document.addEventListener('mouseup', onMouseUp);
  };

  mapPinMain.addEventListener('mouseup', mainPinMouseUpHandler);
  mapPinMain.addEventListener('mousedown', mainPinHandleHandler);
})();
