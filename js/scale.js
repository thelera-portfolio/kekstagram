'use strict';

(function () {
  var Scale = {
    MIN: 25,
    MAX: 100,
    DEFAULT: 100
  };

  var ZoomDirections = {
    IN: 'in',
    OUT: 'out'
  };

  var imageUploadForm = document.querySelector('.img-upload__form');
  var scaleUp = imageUploadForm.querySelector('.scale__control--bigger');
  var scaleDown = imageUploadForm.querySelector('.scale__control--smaller');
  var scaleInput = imageUploadForm.querySelector('.scale__control--value');
  var imageUpload = document.querySelector('.img-upload__preview img');

  scaleInput.value = Scale.DEFAULT + '%';

  var zoomImage = function (currentValue, direction) {
    var newValue;
    if (direction === ZoomDirections.IN) {
      newValue = currentValue < Scale.MIN ? Scale.MIN : currentValue;
    }
    if (direction === ZoomDirections.OUT) {
      newValue = currentValue > Scale.MAX ? Scale.MAX : currentValue;
    }

    scaleInput.value = newValue + '%';
    imageUpload.style.transform = 'scale(' + newValue / 100 + ')';
  };

  scaleUp.addEventListener('click', function () {
    var increasedValue = parseInt(scaleInput.value, 10) + Scale.MIN;
    zoomImage(increasedValue, 'out');
  });

  scaleDown.addEventListener('click', function () {
    var decreasedValue = parseInt(scaleInput.value, 10) - Scale.MIN;
    zoomImage(decreasedValue, 'in');
  });

  window.scale = {
    reset: function () {
      scaleInput.value = Scale.DEFAULT + '%';
      imageUpload.style.transform = 'scale(1)';
    }
  };
})();
