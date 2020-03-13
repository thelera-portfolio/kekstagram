'use strict';

(function () {
  var ENTER_KEYCODE = 'Enter';
  var ESC_KEYCODE = 'Escape';

  window.utils = {
    generateNumber: function (maxNumber) {
      return Math.round(Math.random() * maxNumber);
    },
    generateUniqueRandomArray: function (maxNumber, amountOfNumbers) {
      var uniqueNumbers = [];
      while (uniqueNumbers.length < amountOfNumbers) {
        var number = this.generateNumber(maxNumber - 1);
        if (uniqueNumbers.indexOf(number) === -1) {
          uniqueNumbers.push(number);
        }
      }

      return uniqueNumbers;
    },
    isKeyPressed: {
      enter: function (evt) {
        return evt.key === ENTER_KEYCODE;
      },
      escape: function (evt) {
        return evt.key === ESC_KEYCODE;
      }
    }
  };
})();
