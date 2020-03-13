'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];

  var uploadFile = document.querySelector('#upload-file');
  var imageUpload = document.querySelector('.img-upload__overlay');
  var image = document.querySelector('.img-upload__preview').querySelector('img');
  var imageUploadCancel = document.querySelector('.img-upload__cancel');
  var hashtagInput = document.querySelector('.text__hashtags');
  var commentInput = document.querySelector('.text__description');

  var setFileReader = function (input, picture) {
    var file = input.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (type) {
      return fileName.endsWith(type);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        picture.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  var uploadFileHandler = function () {
    setFileReader(uploadFile, image);

    imageUpload.classList.remove('hidden');
    document.body.classList.add('modal-open');

    window.effect.reset();
    window.scale.reset();

    imageUploadCancel.addEventListener('click', imageUploadCloseButtonHandler);
    document.addEventListener('keydown', imageUploadEscButtonHandler);
  };

  var imageUploadCloseButtonHandler = function () {
    imageUpload.classList.add('hidden');
    document.body.classList.remove('modal-open');
    uploadFile.value = '';

    imageUploadCancel.removeEventListener('click', imageUploadCloseButtonHandler);
    document.removeEventListener('keydown', imageUploadEscButtonHandler);
  };

  var imageUploadEscButtonHandler = function (evt) {
    if (window.utils.isKeyPressed.escape(evt) && hashtagInput !== document.activeElement && commentInput !== document.activeElement) {
      imageUpload.classList.add('hidden');
      document.body.classList.remove('modal-open');
      uploadFile.value = '';

      document.removeEventListener('keydown', imageUploadEscButtonHandler);
      imageUploadCancel.removeEventListener('click', imageUploadCloseButtonHandler);
    }
  };

  uploadFile.addEventListener('change', uploadFileHandler);
})();
