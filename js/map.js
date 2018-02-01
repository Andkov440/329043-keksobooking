'use strict';

var HOUSETITLE = ['Большая уютная квартира',
                 'Маленькая неуютная квартира',
                 'Огромный прекрасный дворец',
                 'Маленький ужасный дворец',
                 'Красивый гостевой домик',
                 'Некрасивый негостеприимный домик',
                 'Уютное бунгало далеко от моря',
                 'Неуютное бунгало по колено в воде'];

var TIME = ['12:00', '13:00', '14:00'];
var HOUSETYPE = ['flat', 'house', 'bungalo'];


var randomValue = function(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

var similarAds = {
  author: {
    avatar: 'img/avatars/user/0' + randomValue(1, 8) + '.png'
  },
  offer: {
    title:
  }
};


