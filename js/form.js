'use strict';

(function () {
  var MIN_PRICES = {flat: 1000, bungalo: 0, house: 5000, palace: 10000};

  var housingType = document.querySelector('#type');
  var housingPrice = document.querySelector('#price');

  var formTitle = document.querySelector('#title');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  var roomNumber = document.querySelector('#room_number');
  var roomCapacity = document.querySelector('#capacity');

  var form = document.querySelector('.notice__form');
  var formAddress = document.querySelector('#address');
  var resetForm = document.querySelector('.form__reset');

  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var pinCenterX = mapPinMain.offsetTop + window.map.MAIN_PIN_WIDTH / 2;
  var pinCenterY = mapPinMain.offsetLeft + window.map.MAIN_PIN_HEIGHT / 2;

  housingPrice.setAttribute('min', MIN_PRICES[housingType.value]);

  housingType.addEventListener('change', function (evt) {
    var target = evt.target;
    housingPrice.setAttribute('min', MIN_PRICES[target.value]);
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
        if (roomCapacity.options[i].value > 0) {
          roomCapacity.options[i].disabled = true;
        } else {
          roomCapacity.options[i].disabled = false;
        }
      }
    }
  };

  syncRoomsGuests(roomNumber.value);

  var setInvalid = function (formElement) {
    formElement.setAttribute('style', 'border: 1px solid red;');
  };

  var setNormal = function (formElement) {
    formElement.setAttribute('style', 'border: 1px solid #d9d9d3;');
  };

  var validateTitle = function () {
    if (formTitle.validity.valueMissing) {
      formTitle.setCustomValidity('Введите название');
      setInvalid(formTitle);
    } else if (formTitle.validity.tooShort) {
      formTitle.setCustomValidity('Название дожно быть не короче 30 символов');
      setInvalid(formTitle);
    } else {
      formTitle.setCustomValidity('');
      setNormal(formTitle);
    }
  };

  var validatePrice = function () {
    if (housingPrice.validity.valueMissing) {
      housingPrice.setCustomValidity('Введите значение цены');
      setInvalid(housingPrice);
    } else if (housingPrice.validity.rangeUnderflow) {
      housingPrice.setCustomValidity('Цена слишком низкая');
      setInvalid(housingPrice);
    } else if (housingPrice.validity.rangeOverflow) {
      housingPrice.setCustomValidity('Цена слишком высокая');
      setInvalid(housingPrice);
    } else {
      housingPrice.setCustomValidity('');
      setNormal(housingPrice);
    }
  };

  var clearForm = function () {
    form.reset();

    syncRoomsGuests(roomNumber.value);

    map.classList.add('map--faded');
    form.classList.add('notice__form--disabled');

    for (var i = 0; i < form.elements.length; i++) {
      form.elements[i].disabled = true;
    }
    window.pin.removePins();

    mapPinMain.style.display = 'block';
    mapPinMain.style.left = '50%';
    mapPinMain.style.top = '50%';

    formAddress.value = pinCenterX + ', ' + pinCenterY;
    window.card.removeMapCard();
  };

  roomNumber.addEventListener('change', function (evt) {
    var target = evt.target;
    syncRoomsGuests(target.value);
  });

  form.addEventListener('click', function () {
    formTitle.addEventListener('invalid', validateTitle());
    housingPrice.addEventListener('invalid', validatePrice());
  });

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.upload(new FormData(form), function () {
      clearForm();
    }, window.backend.errorHandler);
  });

  resetForm.addEventListener('click', function () {
    clearForm();
  });
})();
