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

var similarAds = [];

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

var createAdsData = function (adsArray) {
  for (var i = 0; i < ADS_QUANTITY; i++) {
    var pinLocation = {
      x: generateValueFromRange(300, 900),
      y: generateValueFromRange(150, 500)
    };
    adsArray.push({
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: HOUSE_TITLES[i],
        address: pinLocation.x + PIN_WIDTH / 2 + ',' + pinLocation.y + PIN_HEIGHT,
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
  return adsArray;
};

document.querySelector('.map').classList.remove('map--faded');
var adsData = createAdsData(similarAds);

var generatePins = function (adsArray) {
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < ADS_QUANTITY; i++) {
    var newPin = document.createElement('button');
    newPin.className = 'map__pin';
    newPin.style = 'left: ' + adsArray[i].location.x + 'px; top: ' + adsArray[i].location.y + 'px';
    newPin.innerHTML = '<img src="' + adsArray[i].author.avatar + '" width="40" height="40" draggable="false">';
    fragment.appendChild(newPin);
  }
  mapPins.appendChild(fragment);
};

var createAdvert = function (adsArray) {
  var adsTemplateElement = document.querySelector('template').content;
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  adsTemplateElement.querySelector('h3').textContent = adsArray[0].offer.title;
  adsTemplateElement.querySelector('small').textContent = adsArray[0].offer.address;
  adsTemplateElement.querySelector('.popup__price').textContent = adsArray[0].offer.price + '&#x20bd;/ночь';
  adsTemplateElement.querySelector('h4').textContent = HOUSE_TYPES[adsArray[0].offer.type];
  adsTemplateElement.querySelector('p:nth-child(7)').textContent = adsArray[0].offer.rooms + ' комнаты для ' + adsArray[0].offer.guests + ' гостей';
  adsTemplateElement.querySelector('p:nth-child(8)').textContent = 'Заезд после ' + adsArray[0].offer.checkin + ', выезд до ' + adsArray[0].offer.checkout;
  adsTemplateElement.querySelector('p:last-of-type').textContent = adsArray[0].offer.description;
  adsTemplateElement.querySelector('.popup__avatar').src = adsArray[0].author.avatar;

  document.querySelector('.map').insertBefore(adsTemplateElement, mapFiltersContainer);

  removeChildren(document.querySelector('.popup__features'));
  for (var i = 0; i < adsArray[0].offer.features.length; i++) {
    document.querySelector('.popup__features').innerHTML += '<li class="feature feature--' + adsArray[0].offer.features[i] + '"></li>';
  }

  removeChildren(document.querySelector('.popup__pictures'));
  for (i = 0; i < adsArray[0].offer.photos.length; i++) {
    document.querySelector('.popup__pictures').innerHTML += '<li><img src="' + adsArray[0].offer.photos[i] + '" width="50" height="50"></li>';
  }
};

generatePins(adsData);
createAdvert(adsData);

