'use strict';

(function () {
  var HOUSE_TITLES = ['Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'];

  var TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES_ITEMS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  window.data = {
    HOUSE_TYPES: {flat: 'Квартира', house: 'Дом', bungalo: 'Бунгало'},
    ADS_QUANTITY: 8,
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,

    removeChildren: function (elem) {
      while (elem.lastChild) {
        elem.removeChild(elem.lastChild);
      }
    },
    createAdverts: function () {
      var similarAds = [];
      for (var i = 0; i < window.data.ADS_QUANTITY; i++) {
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
            type: Object.keys(window.data.HOUSE_TYPES)[generateValueFromRange(0, Object.keys(window.data.HOUSE_TYPES).length - 1)],
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
    }
  };

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
})();
