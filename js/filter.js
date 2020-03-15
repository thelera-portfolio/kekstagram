'use strict';

// фильтрация изображений, загруженных пользователями
(function () {
  var RANDOM_FILTERED_AMOUNT = 10;

  var picturesContainer = document.querySelector('.pictures');

  var showPictures = function (data) {
    picturesContainer.appendChild(window.photo.createList(data));
  };

  var clearPictures = function () {
    var showedPictures = document.querySelectorAll('.picture');
    Array.from(showedPictures).forEach(function (picture) {
      picture.remove();
    });
  };

  window.filter = {
    setBasic: function (data) {
      clearPictures();
      showPictures(data);
    },
    setRandom: function (data) {
      clearPictures();

      var randomArray = window.utils.generateUniqueRandomArray(data.length, RANDOM_FILTERED_AMOUNT);
      var filteredData = data.filter(function (picture) {
        return randomArray.includes(picture.id);
      });
      showPictures(filteredData);
    },
    setDiscussed: function (data) {
      clearPictures();

      var filteredData = data.slice();
      filteredData.sort(function (firstPicture, secondPicture) {
        return secondPicture.comments.length - firstPicture.comments.length;
      });

      showPictures(filteredData);
    }
  };
})();
