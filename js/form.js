'use strict';

(function () {
  var MIN_PRICES = {flat: 1000, bungalo: 0, house: 5000, palace: 10000};

  var housingType = document.querySelector('#type');
  var housingPrice = document.querySelector('#price');

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  var roomNumber = document.querySelector('#room_number');
  var roomCapacity = document.querySelector('#capacity');

  var form = document.querySelector('.notice__form');
  var formAddress = document.querySelector('#address');

  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var pinCenterX = mapPinMain.offsetTop + window.map.MAIN_PIN_WIDTH / 2;
  var pinCenterY = mapPinMain.offsetLeft + window.map.MAIN_PIN_HEIGHT / 2;

  var mapPins = document.querySelector('.map__pins');

  housingType.addEventListener('change', function (evt) {
    var target = evt.target;
    housingPrice.min = MIN_PRICES[target.value];
  });

  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });

  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });

  var syncRoomsGuests = function (value) {
    if (+value !== 100) {
      roomCapacity.value = value;
      for (var i = 0; i < roomCapacity.options.length; i++) {
        if (+value >= +roomCapacity.options[i].value && +roomCapacity.options[i].value !== 0) {
          roomCapacity.options[i].disabled = false;
        } else {
          roomCapacity.options[i].disabled = true;
        }
      }
    } else {
      roomCapacity.value = '0';
      for (i = 0; i < roomCapacity.options.length; i++) {
        if (+roomCapacity.options[i].value > 0) {
          roomCapacity.options[i].disabled = true;
        }
      }
    }
  };

  syncRoomsGuests(roomNumber.value);

  roomNumber.addEventListener('change', function (evt) {
    var target = evt.target;
    syncRoomsGuests(target.value);
  });

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(form), function () {
      form.reset();

      syncRoomsGuests(roomNumber.value);

      map.classList.add('map--faded');
      form.classList.add('notice__form--disabled');
      form.elements.disabled = true;
      var mapPinsElements = mapPins.children;

      for (var i = mapPinsElements.length - 1; i >= 0; i--) {
        if (mapPinsElements[i].hasAttribute('offer-id')) {
          mapPins.removeChild(mapPinsElements[i]);
        }
      }

      mapPinMain.style.display = 'block';
      mapPinMain.style.left = '50%';
      mapPinMain.style.top = '50%';

      formAddress.value = pinCenterX + ', ' + pinCenterY;
      window.card.removeMapCard();

    }, window.backend.errorHandler);
  });
})();
