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
var HOUSE_TYPE = {'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};
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
  return mixArray(newArr).slice(0, randomValueFromRange(0, newArr.length - 1));
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
        //type: Object.keys(HOUSE_TYPE[randomValueFromRange(0, HOUSE_TYPE.length)]),
        type: Object.keys(HOUSE_TYPE)[randomValueFromRange(0, Object.keys(HOUSE_TYPE).length)],
        rooms: randomValueFromRange(1, 5),
        guests: randomValueFromRange(1, 10),
        checkin: TIME[randomValueFromRange(0, TIME.length)],
        checkout: TIME[randomValueFromRange(0, TIME.length)],
        features: generateArrayRandomLength(FEATURES_ITEMS),
        description: '',
        photos: mixArray(PHOTOS)
      },
      location: pinLocation
    });
  }
  return adsArray;
};
console.log(createAdsData(similarAds));
console.log(HOUSE_TYPE.length);
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
var adsElement = adsTemplateElement.cloneNode(true);
var mapFiltersContainer = document.querySelector('.map__filters-container');
adsElement.querySelector('h3').textContent = adsData[0].offer.title;
adsElement.querySelector('small').textContent = adsData[0].offer.address;
adsElement.querySelector('.popup__price').textContent = adsData[0].offer.price + '&#x20bd;/ночь';
adsElement.querySelector('h4').textContent = adsData[0].offer.title;

document.querySelector('.map').insertBefore(adsElement, mapFiltersContainer);

//console.log(adsTemplateElement);

