'use strict';

(function () {

  var TOP_LIMIT = 150;
  var BOTTOM_LIMIT = 500;
  var ADS_COUNT = 5;

  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var isDataLoad = false;

  var Limits = {
    RIGHT: map.offsetWidth,
    LEFT: mapPinMain.offsetWidth,
    TOP: map.offsetTop + TOP_LIMIT,
    BOTTOM: map.offsetTop + BOTTOM_LIMIT
  };

  window.map = {
    HOUSE_TYPES: {flat: 'Квартира', house: 'Дом', bungalo: 'Бунгало'},
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    MAIN_PIN_HEIGHT: 70,
    MAIN_PIN_WIDTH: 65,

    removeChildren: function (elem) {
      while (elem.lastChild) {
        elem.removeChild(elem.lastChild);
      }
    }
  };

  var mainPinMouseUpHandler = function () {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.notice__form').classList.remove('notice__form--disabled');
    document.querySelector('.notice__form').elements.disabled = false;
    var pinY = mapPinMain.offsetTop + window.map.MAIN_PIN_HEIGHT;
    var pinX = mapPinMain.offsetLeft + Math.floor(window.map.MAIN_PIN_WIDTH / 2);
    formAddress.value = pinX + ', ' + pinY;
    if (isDataLoad === false) {
      window.backend.load(function (adverts) {
        window.data = adverts.slice(0, ADS_COUNT);
        window.filteredOffers = adverts.slice(0, ADS_COUNT);
        window.generatePins(window.data);
      }, window.backend.errorHandler);
    } else {
      window.generatePins(window.filteredOffers);
    }
    isDataLoad = true;
  };

  var pinCenterX = mapPinMain.offsetTop + window.map.MAIN_PIN_WIDTH / 2;
  var pinCenterY = mapPinMain.offsetLeft + window.map.MAIN_PIN_HEIGHT / 2;

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

      var pinY = mapPinMain.offsetTop + window.map.MAIN_PIN_HEIGHT;
      var pinX = mapPinMain.offsetLeft + Math.floor(window.map.MAIN_PIN_WIDTH / 2);

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if ((pinX - shift.x <= Limits.RIGHT) && (pinX - shift.x >= Limits.LEFT)) {
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      }
      if ((pinY - shift.y <= Limits.BOTTOM) && (pinY - shift.y >= Limits.TOP)) {
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      var pinY = mapPinMain.offsetTop + window.map.MAIN_PIN_HEIGHT;
      var pinX = mapPinMain.offsetLeft + Math.floor(window.map.MAIN_PIN_WIDTH / 2);
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
