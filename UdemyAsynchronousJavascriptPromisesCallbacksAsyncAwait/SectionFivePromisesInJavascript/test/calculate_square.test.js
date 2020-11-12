describe('calculateSquare function with callbacks and then with promises', function () {
  let calculateSquare, callback;
  describe('calculateSquare function with callbacks', function () {
    beforeEach(() => {
      calculateSquare = function(n, callback) {
        setTimeout(function() {
          if (typeof n !== 'number') {
            callback(new TypeError('Input should be a number'))
            return;
          } else {
            let result = n * n;
            callback(null, result);
          }
        }, 1000);
      }
    });

    it('should return an error if the first argument is not a number', function (done) {
      callback = function(error, data) {
        expect(error.name).toBe("TypeError");
        expect(error.message).toBe('Input should be a number');
        done();
      }
      calculateSquare('bad input', callback);
    });

    it('should return the square of a number if the argument is a number', function (done) {
      callback = function(error, data) {
        expect(error).toBeNull();
        expect(data).toBe(4);
        done();
      }
      calculateSquare(2, callback);
    });
  });
  describe('calculateSquare function with promises', function () {
    beforeEach(() => {
      calculateSquare = function(number) {
        const promise = new Promise(function (resolve, reject) {
          setTimeout(function() {
            if (typeof number !== 'number') {
              return reject(new TypeError('Argument of type number is required'));
            }
            const result = number * number;
            return resolve(result);
          }, 1000);
        });
        return promise;
      }
    });

    it('promise format should return an error for a string input', function () {
      expect.assertions(1);
      return expect(calculateSquare('bad input')).rejects.toThrowError(TypeError);
    });

    it('promise format should return a number when the promise resolves', function () {
      expect.assertions(1);
      return expect(calculateSquare(2)).resolves.toBe(4);
    });
  });
});