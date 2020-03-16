'use strict';

// отрисовка увеличенного изображения
(function () {
  var MAX_COMMENTS_QUANTITY = 5;

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImage = bigPicture.querySelector('.big-picture__img img');
  var bigPictureLikes = bigPicture.querySelector('.likes-count');
  var bigPictureSocialComments = bigPicture.querySelector('.social__comments');
  var bigPictureSocialCommentsCount = bigPicture.querySelector('.social__comment-count');
  var bigPictureSocialCaption = bigPicture.querySelector('.social__caption');
  var bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
  var bigPictureMoreComments = bigPicture.querySelector('.comments-loader');

  var createComment = function (comment) {
    var socialComment = document.createElement('li');
    var socialPicture = document.createElement('img');
    var socialText = document.createElement('p');

    socialComment.appendChild(socialPicture);
    socialComment.appendChild(socialText);

    socialComment.classList.add('social__comment');

    socialPicture.classList.add('social__picture');
    socialPicture.src = comment.avatar;
    socialPicture.alt = comment.name;
    socialPicture.style.width = '35';
    socialPicture.style.height = '35';

    socialText.classList.add('social__text');
    socialText.textContent = comment.message;

    return socialComment;
  };

  var showComments = function (picture, startIndex) {
    var showedComments = picture.comments.slice(startIndex, startIndex + MAX_COMMENTS_QUANTITY);
    showedComments.forEach(function (comment) {
      bigPictureSocialComments.appendChild(createComment(comment));
    });

    if (bigPictureSocialComments.children.length === picture.comments.length) {
      bigPictureMoreComments.classList.add('hidden');
    }
  };

  var changeShowedCommentsQuantity = function (showedComments) {
    var commentText = bigPictureSocialCommentsCount.innerHTML;
    bigPictureSocialCommentsCount.innerHTML = commentText.replace(/^\S+/, showedComments);
  };

  window.bigPicture = {
    create: function (picture) {
      var bigPictureComments = bigPicture.querySelector('.comments-count');

      bigPicture.classList.remove('hidden');
      bigPictureMoreComments.classList.remove('hidden');
      bigPictureImage.src = picture.url;
      bigPictureLikes.textContent = picture.likes;
      bigPictureComments.textContent = picture.comments.length;
      if (picture.comments.length < MAX_COMMENTS_QUANTITY) {
        changeShowedCommentsQuantity(picture.comments.length);
      } else {
        changeShowedCommentsQuantity(MAX_COMMENTS_QUANTITY);
      }

      // обработчики закрытия окна и нажатия на кнопку 'загрузить еще комментарии'
      var bigPictureCloseButtonHandler = function () {
        bigPicture.classList.add('hidden');
        document.body.classList.remove('modal-open');

        document.removeEventListener('keydown', bigPictureEscButtonHandler);
        bigPictureCloseButton.removeEventListener('click', bigPictureCloseButtonHandler);
        bigPictureMoreComments.removeEventListener('click', moreCommentsButtonHandler);
      };

      var bigPictureEscButtonHandler = function (evt) {
        if (window.utils.isKeyPressed.escape(evt)) {
          bigPicture.classList.add('hidden');
          document.body.classList.remove('modal-open');

          bigPictureCloseButton.removeEventListener('click', bigPictureCloseButtonHandler);
          document.removeEventListener('keydown', bigPictureEscButtonHandler);
          bigPictureMoreComments.removeEventListener('click', moreCommentsButtonHandler);
        }
      };

      var moreCommentsButtonHandler = function () {
        var commentStartIndex = bigPictureSocialComments.children.length;
        showComments(picture, commentStartIndex);
        var showedComments = bigPictureSocialComments.children.length;
        changeShowedCommentsQuantity(showedComments);
      };

      document.body.classList.add('modal-open');

      Array.from(bigPictureSocialComments.children).forEach(function (comment) {
        comment.remove();
      });

      showComments(picture, 0);

      bigPictureSocialCaption.textContent = picture.description;

      bigPictureCloseButton.addEventListener('click', bigPictureCloseButtonHandler);
      document.addEventListener('keydown', bigPictureEscButtonHandler);

      bigPictureMoreComments.addEventListener('click', moreCommentsButtonHandler);
    }
  };
})();
