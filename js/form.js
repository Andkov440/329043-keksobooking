'use strict';

(function () {
  var MIN_PRICES = {flat: 1000, bungalo: 0, house: 5000, palace: 10000};

  var housingType = document.querySelector('#type');
  var housingPrice = document.querySelector('#price');

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  var roomNumber = document.querySelector('#room_number');
  var roomCapacity = document.querySelector('#capacity');

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
})();