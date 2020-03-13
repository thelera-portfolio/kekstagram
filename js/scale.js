'use strict';

(function () {
  var Scale = {
    MIN: 25,
    MAX: 100,
    DEFAULT: 100
  };

  var imageUploadForm = document.querySelector('.img-upload__form');
  var scaleUp = imageUploadForm.querySelector('.scale__control--bigger');
  var scaleDown = imageUploadForm.querySelector('.scale__control--smaller');
  var scaleInput = imageUploadForm.querySelector('.scale__control--value');
  var imageUpload = document.querySelector('.img-upload__preview').querySelector('img');

  scaleInput.value = Scale.DEFAULT + '%';

  var getIncreasedScale = function () {
    var increasedValue = Number(scaleInput.value.match(/[0-9]+/)) + Scale.MIN;
    return increasedValue > Scale.MAX ? Scale.MAX : increasedValue;
  };

  var getDecreasedScale = function () {
    var decreasedValue = Number(scaleInput.value.match(/[0-9]+/)) - Scale.MIN;
    return decreasedValue < Scale.MIN ? Scale.MIN : decreasedValue;
  };

  scaleUp.addEventListener('click', function () {
    var increasedScale = getIncreasedScale();
    scaleInput.value = increasedScale + '%';
    imageUpload.style.transform = 'scale(' + increasedScale / 100 + ')';
  });

  scaleDown.addEventListener('click', function () {
    var decreasedScale = getDecreasedScale();
    scaleInput.value = decreasedScale + '%';
    imageUpload.style.transform = 'scale(' + decreasedScale / 100 + ')';
  });

  window.scale = {
    reset: function () {
      scaleInput.value = Scale.DEFAULT + '%';
      imageUpload.style.transform = 'scale(1)';
    }
  };
})();
