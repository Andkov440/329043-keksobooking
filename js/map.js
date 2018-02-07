'use strict';

var HOUSE_TITLE = ['Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'];

var ADS_QUANTITY = 8;
var TIME = ['12:00', '13:00', '14:00'];
var HOUSE_TYPE = {flat: 'Квартира', house: 'Дом', bungalo: 'Бунгало'};
var FEATURES_ITEMS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var similarAds = [];

var randomValueFromRange = function (min, max) {
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
  return mixArray(newArr).slice(0, randomValueFromRange(1, newArr.length - 1));
};

var removeChildren = function (elem) {
  while (elem.lastChild) {
    elem.removeChild(elem.lastChild);
  }
};

var createAdsData = function (adsArray) {
  for (var i = 0; i < ADS_QUANTITY; i++) {
    var pinLocation = {
      x: randomValueFromRange(300, 900),
      y: randomValueFromRange(150, 500)
    };
    adsArray.push({
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: HOUSE_TITLE[i],
        address: pinLocation.x + ',' + pinLocation.y,
        price: randomValueFromRange(1000, 1000000),
        type: Object.keys(HOUSE_TYPE)[randomValueFromRange(0, Object.keys(HOUSE_TYPE).length - 1)],
        rooms: randomValueFromRange(1, 5),
        guests: randomValueFromRange(1, 10),
        checkin: TIME[randomValueFromRange(0, TIME.length - 1)],
        checkout: TIME[randomValueFromRange(0, TIME.length - 1)],
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

var mapPins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();
var adsData = createAdsData(similarAds);

for (var i = 0; i < ADS_QUANTITY; i++) {
  var newPin = document.createElement('button');
  newPin.className = 'map__pin';
  newPin.style = 'left: ' + adsData[i].location.x + 'px; top: ' + adsData[i].location.y + 'px';
  newPin.innerHTML = '<img src="' + adsData[i].author.avatar + '" width="40" height="40" draggable="false">';
  fragment.appendChild(newPin);
}
mapPins.appendChild(fragment);

var adsTemplateElement = document.querySelector('template').content;
var mapFiltersContainer = document.querySelector('.map__filters-container');
adsTemplateElement.querySelector('h3').textContent = adsData[0].offer.title;
adsTemplateElement.querySelector('small').textContent = adsData[0].offer.address;
adsTemplateElement.querySelector('.popup__price').textContent = adsData[0].offer.price + '&#x20bd;/ночь';
adsTemplateElement.querySelector('h4').textContent = HOUSE_TYPE[adsData[0].offer.type];
adsTemplateElement.querySelector('p:nth-child(7)').textContent = adsData[0].offer.rooms + ' комнаты для ' + adsData[0].offer.guests + 'гостей';
adsTemplateElement.querySelector('p:nth-child(8)').textContent = 'Заезд после ' + adsData[0].offer.checkin + ', выезд до ' + adsData[0].offer.checkout;
adsTemplateElement.querySelector('p:last-of-type').textContent = adsData[0].offer.description;
adsTemplateElement.querySelector('.popup__avatar').src = adsData[0].author.avatar;

document.querySelector('.map').insertBefore(adsTemplateElement, mapFiltersContainer);

removeChildren(document.querySelector('.popup__features'));
for (i = 0; i < adsData[0].offer.features.length; i++) {
  document.querySelector('.popup__features').innerHTML += '<li class="feature feature--' + adsData[0].offer.features[i] + '"></li>';
}

removeChildren(document.querySelector('.popup__pictures'));
for (i = 0; i < adsData[0].offer.photos.length; i++) {
  document.querySelector('.popup__pictures').innerHTML += '<li><img src="' + adsData[0].offer.photos[i] + '" width="50" height="50"></li>';
}
