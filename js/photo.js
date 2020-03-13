'use strict';

// отрисовка миниатюр
(function () {
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var createPhoto = function (picture) {
    var photo = photoTemplate.cloneNode(true);
    var pictureImg = photo.querySelector('.picture__img');
    var pictureLikes = photo.querySelector('.picture__likes');
    var pictureComments = photo.querySelector('.picture__comments');

    pictureImg.src = picture.url;
    pictureImg.dataset.id = picture.id;
    pictureLikes.textContent = picture.likes;
    pictureComments.textContent = picture.comments.length;

    return photo;
  };

  window.photo = {
    createList: function (pictures) {
      var fragment = document.createDocumentFragment();

      pictures.forEach(function (picture) {
        if (createPhoto(picture)) {
          fragment.appendChild(createPhoto(picture));
        }
      });

      return fragment;
    }
  };
})();
