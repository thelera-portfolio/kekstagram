'use strict';

// форма редактирования изображения
(function () {
  var Hashtag = {
    MATCH_EXPRESSION: /[^A-Za-zА-Яа-я0-9]/,
    MAX_LENGTH: 20,
    MAX_QUANTITY: 5
  };

  var ERROR_MESSAGE = 'Ошибка загрузки файла. ';
  var ESC_KEY = 'Escape';
  var ERROR_BORDER_STYLE = '0 0 3px 3px #ff0000';

  var mainContent = document.querySelector('main');
  var uploadFile = document.querySelector('#upload-file');
  var imageUpload = document.querySelector('.img-upload__overlay');
  var imageUploadForm = document.querySelector('.img-upload__form');
  var hashtagInput = imageUploadForm.querySelector('.text__hashtags');
  var commentInput = imageUploadForm.querySelector('.text__description');

  var successAnswerPopupTemplate = document.querySelector('#success').content.querySelector('.success');
  var successAnswerPopup = successAnswerPopupTemplate.cloneNode(true);
  var successAnswerPopupCloseButton = successAnswerPopupTemplate.querySelector('.success__button');

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorPopup = errorTemplate.cloneNode(true);
  var errorMessage = errorPopup.querySelector('.error__title');
  var errorPopupCloseButton = errorTemplate.querySelector('.error__button');

  // валидация формы
  var isTagInvalid = function (tag, index, tags) {
    var validationMessage = '';

    if (tags.length > Hashtag.MAX_QUANTITY) {
      validationMessage = 'Максимум 5 хеш-тегов';
    } else if (tag[0] !== '#') {
      validationMessage = 'Хеш-тег должен начинаться с #';
    } else if (tag.slice(1).match(Hashtag.MATCH_EXPRESSION)) {
      validationMessage = 'Хеш-тег может содержать только буквы и цифры';
    } else if (tag === '#') {
      validationMessage = 'Хеш-тег не может состоять только из одной #';
    } else if (tag.length > Hashtag.MAX_LENGTH) {
      validationMessage = 'Максимальная длина одного хэш-тега 20 символов, включая решётку';
    } else if (index !== tags.indexOf(tag) || index !== tags.lastIndexOf(tag)) { // поиск повторов
      validationMessage = 'Хеш-теги не должны повторяться';
    } else {
      validationMessage = '';
    }

    hashtagInput.setCustomValidity(validationMessage);

    return validationMessage !== '';
  };

  hashtagInput.addEventListener('input', function () {
    var hashtags = hashtagInput.value.toLowerCase().split(' ');

    hashtagInput.removeAttribute('style');
    hashtags.find(isTagInvalid);
  });

  commentInput.addEventListener('input', function () {
    commentInput.removeAttribute('style');
    if (commentInput.value.length > 140) {
      commentInput.setCustomValidity('Длина комментария не может составлять больше 140 символов');
    } else {
      commentInput.setCustomValidity('');
    }
  });

  // обработчики всплывающего окна о ошибке / успешной отправке данных
  var successAnswerPopupClickHandler = function () {
    mainContent.removeChild(successAnswerPopup);

    document.removeEventListener('click', successAnswerPopupClickHandler);
    document.removeEventListener('keydown', successAnswerPopupEscButtonHandler);
    successAnswerPopupCloseButton.removeEventListener('click', successAnswerPopupCloseButtonHandler);
  };

  var successAnswerPopupEscButtonHandler = function (evt) {
    if (evt.key === ESC_KEY) {
      mainContent.removeChild(successAnswerPopup);

      document.removeEventListener('keydown', successAnswerPopupEscButtonHandler);
      document.removeEventListener('click', successAnswerPopupClickHandler);
      successAnswerPopupCloseButton.removeEventListener('click', successAnswerPopupCloseButtonHandler);
    }
  };

  var successAnswerPopupCloseButtonHandler = function () {
    mainContent.removeChild(successAnswerPopup);

    document.removeEventListener('keydown', successAnswerPopupEscButtonHandler);
    document.removeEventListener('click', successAnswerPopupClickHandler);
    successAnswerPopupCloseButton.removeEventListener('click', successAnswerPopupCloseButtonHandler);
  };

  var errorPopupClickHandler = function () {
    mainContent.removeChild(errorPopup);

    document.removeEventListener('click', errorPopupClickHandler);
    document.removeEventListener('keydown', errorPopupEscButtonHandler);
    document.removeEventListener('click', errorPopupCloseButtonHandler);
  };

  var errorPopupEscButtonHandler = function (evt) {
    if (evt.key === ESC_KEY) {
      mainContent.removeChild(errorPopup);

      document.removeEventListener('click', errorPopupClickHandler);
      document.removeEventListener('keydown', errorPopupEscButtonHandler);
      document.removeEventListener('click', errorPopupCloseButtonHandler);
    }
  };

  var errorPopupCloseButtonHandler = function () {
    mainContent.removeChild(errorPopup);

    document.removeEventListener('click', errorPopupClickHandler);
    document.removeEventListener('keydown', errorPopupEscButtonHandler);
    document.removeEventListener('click', errorPopupCloseButtonHandler);
  };

  var successHandler = function () {
    imageUpload.classList.add('hidden');
    mainContent.appendChild(successAnswerPopup);

    uploadFile.value = '';
    imageUploadForm.reset();
    window.scale.reset();
    window.effect.reset();

    successAnswerPopupCloseButton.addEventListener('click', successAnswerPopupCloseButtonHandler);
    document.addEventListener('click', successAnswerPopupClickHandler);
    document.addEventListener('keydown', successAnswerPopupEscButtonHandler);
  };

  var errorHandler = function (message) {
    imageUpload.classList.add('hidden');
    errorMessage.textContent = ERROR_MESSAGE + message;
    mainContent.appendChild(errorPopup);

    uploadFile.value = '';
    imageUploadForm.reset();
    window.scale.reset();
    window.effect.reset();

    document.addEventListener('click', errorPopupClickHandler);
    document.addEventListener('keydown', errorPopupEscButtonHandler);
    errorPopupCloseButton.addEventListener('click', errorPopupCloseButtonHandler);
  };

  // отправка данных на сервер с помощью AJAX
  imageUploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.save(successHandler, errorHandler, new FormData(imageUploadForm));
  });

  // подсветка полей с ошибками
  var addErrorBorderHandler = function (evt) {
    evt.target.style.boxShadow = ERROR_BORDER_STYLE;
  };

  hashtagInput.addEventListener('invalid', addErrorBorderHandler);
  commentInput.addEventListener('invalid', addErrorBorderHandler);

  window.form = {
    reset: function () {
      hashtagInput.setCustomValidity('');
      hashtagInput.removeAttribute('style');
      commentInput.setCustomValidity('');
      commentInput.removeAttribute('style');
    }
  };
})();
