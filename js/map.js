'use strict';
(function () {
  ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
        center: [59.938536, 30.3224549],
        zoom: 16
      }, {
        searchControlProvider: 'yandex#search'
      }),
      myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
        hintContent: 'Pink',
        balloonContent: 'Скачивайте наше приложение, сделайте свою жизнь чуточку краше:)'
      }, {
        iconLayout: 'default#image',
        iconImageHref: 'https://kvezal.github.io/pink/img/icon-map-marker.svg',
        iconImageSize: [218, 142],
        iconImageOffset: [-28, -142]
      });
    myMap.behaviors.disable('scrollZoom');
    myMap.geoObjects.add(myPlacemark);
  });
})();
