'use strict';

// наложение фильтров на загруженное пользователем изображение
(function () {
  var ENTRY_LEVEL_DEPTH = 100; // %

  var effectsMap = {
    none: {
      name: 'none',
      unit: '',
      maxValue: ''
    },
    chrome: {
      name: 'grayscale',
      unit: '',
      maxValue: 1
    },
    sepia: {
      name: 'sepia',
      unit: '',
      maxValue: 1
    },
    marvin: {
      name: 'invert',
      unit: '%',
      maxValue: 100
    },
    phobos: {
      name: 'blur',
      unit: 'px',
      maxValue: 3
    },
    heat: {
      name: 'brightness',
      unit: '',
      maxValue: 3
    }
  };

  var effectButtons = document.querySelectorAll('.effects__radio');
  var imageUpload = document.querySelector('.img-upload__preview img');
  var effectLevel = document.querySelector('.img-upload__effect-level');

  effectLevel.classList.add('hidden');

  var effectClickHandler = function (evt) {
    var effectName = 'effects__preview--' + evt.target.value;
    imageUpload.removeAttribute('class');
    imageUpload.classList.add(effectName);

    if (evt.target.value === 'none') {
      effectLevel.classList.add('hidden');
    } else {
      effectLevel.classList.remove('hidden');
    }

    window.effect.setDepth(ENTRY_LEVEL_DEPTH, evt.target.value);
    window.slider.setEffectLevel(ENTRY_LEVEL_DEPTH, evt.target.value);
  };

  effectButtons.forEach(function (button) {
    button.addEventListener('click', function (evt) {
      effectClickHandler(evt);
    });
  });

  window.effect = {
    reset: function () {
      effectButtons[0].click();
    },
    setDepth: function (depth, effect) {
      if (effect === 'none') {
        imageUpload.style.filter = effectsMap[effect].name;
      } else {
        imageUpload.style.filter = effectsMap[effect].name + '(' + (depth * effectsMap[effect].maxValue / 100) + effectsMap[effect].unit + ')';
      }
    }
  };
})();
