'use strict';

(function () {
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var effectLevelDepthLine = document.querySelector('.effect-level__depth');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var lineLength = effectLevelLine.offsetWidth;

  effectLevelPin.addEventListener('mousedown', function (evt) {
    var startLevel = evt.clientX;

    evt.preventDefault();

    var mouseMoveHandler = function (evtMove) {
      var shift = evtMove.clientX - startLevel;
      var effectLevel = effectLevelValue.value;
      var pinOffsetLeft = effectLevelPin.offsetLeft; // смещение середины пина (с учетом марджина -9px) относительно линии;
      lineLength = effectLevelLine.offsetWidth;

      evtMove.preventDefault();

      startLevel = evtMove.clientX;

      effectLevelPin.style.left = (pinOffsetLeft + shift) + 'px';
      effectLevelDepthLine.style.width = pinOffsetLeft + 'px';
      effectLevel = Math.round((pinOffsetLeft + shift) / lineLength * 100) + '';
      window.effect.setDepth(effectLevel);

      if (pinOffsetLeft < 0) {
        effectLevelPin.style.left = '0px';
      }

      if (pinOffsetLeft > lineLength) {
        effectLevelPin.style.left = lineLength + 'px';
      }
    };

    var mouseUpHandler = function (evtUp) {
      evtUp.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  window.slider = {
    setEffectLevel: function (depth) {
      lineLength = effectLevelLine.offsetWidth;
      effectLevelPin.style.left = (depth * lineLength / 100) + 'px';
      effectLevelDepthLine.style.width = (depth * lineLength / 100) + 'px';
    }
  };
})();
