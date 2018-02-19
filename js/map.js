'use strict';

var HOUSE_TITLES = ['Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'];

var ADS_QUANTITY = 8;
var TIMES = ['12:00', '13:00', '14:00'];
var HOUSE_TYPES = {flat: 'Квартира', house: 'Дом', bungalo: 'Бунгало'};
var FEATURES_ITEMS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var PIN_WIDTH = 40;
var PIN_HEIGHT = 70;

var MAIN_PIN_HEIGHT = 70;
var MAIN_PIN_WIDTH = 65;

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var generateValueFromRange = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

var mixArray = function (arr) {
  var newArr = arr.slice();
  for (var i = newArr.length - 1; i > 0; i--) {
    var num = Math.floor(Math.random() * (i + 1));
    var buffer = newArr[num];
    newArr[num] = newArr[i];
    newArr[i] = buffer;
  }
  return newArr;
};

var generateArrayRandomLength = function (arr) {
  var newArr = arr.slice();
  return mixArray(newArr).slice(0, generateValueFromRange(1, newArr.length - 1));
};

var removeChildren = function (elem) {
  while (elem.lastChild) {
    elem.removeChild(elem.lastChild);
  }
};

var createAdverts = function () {
  var similarAds = [];
  for (var i = 0; i < ADS_QUANTITY; i++) {
    var pinLocation = {
      x: generateValueFromRange(300, 900),
      y: generateValueFromRange(150, 500)
    };
    similarAds.push({
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: HOUSE_TITLES[i],
        address: pinLocation.x + ',' + pinLocation.y,
        price: generateValueFromRange(1000, 1000000),
        type: Object.keys(HOUSE_TYPES)[generateValueFromRange(0, Object.keys(HOUSE_TYPES).length - 1)],
        rooms: generateValueFromRange(1, 5),
        guests: generateValueFromRange(1, 10),
        checkin: TIMES[generateValueFromRange(0, TIMES.length - 1)],
        checkout: TIMES[generateValueFromRange(0, TIMES.length - 1)],
        features: generateArrayRandomLength(FEATURES_ITEMS),
        description: '',
        photos: mixArray(PHOTOS)
      },
      location: pinLocation
    });
  }
  return similarAds;
};

var adverts = createAdverts();

var generatePins = function (ads) {
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

var map = document.querySelector('.map');

var renderAdvert = function (advert) {
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

var removeMapCard = function () {
  var mapCard = map.querySelector('.map__card');
  if (mapCard) {
    var closePopup = document.querySelector('.popup__close');
    closePopup.removeEventListener('click', removeMapCard);
    closePopup.removeEventListener('keydown', popupEnterPressHandler);
    document.removeEventListener('keydown', popupEscPressHandler);
    map.removeChild(mapCard);
  }
};

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

var MIN_PRICE = [1000, 0, 5000, 10000];
var housingType = document.querySelector('#type');
var housingPrice = document.querySelector('#price');

housingType.addEventListener('change', function () {
  for (var i = 0; i < housingType.options.length; i++) {
    var option = housingType.options[i];
    if (option.selected) {
      housingPrice.min = MIN_PRICE[i];

    }
  }
});


