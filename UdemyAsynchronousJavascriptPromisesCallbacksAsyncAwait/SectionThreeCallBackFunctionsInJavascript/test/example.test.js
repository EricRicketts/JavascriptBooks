describe('Section Three Callback Functions In Javascript', function () {
  let calculateSquare;
  beforeEach(() => {
    jest.useFakeTimers();
    calculateSquare = function(number, callback) {
      setTimeout(function() {
        if (typeof  number !== 'number') {
          callback(new Error('Caught Error: Argument of type number is expected.'));
          return;
        }
        const result = number * number;
        callback(null, result);
      }, 1000);
    }
  });

  it('Modify try/catch for asynchronous behavior, invoke normal behavior', function (done) {
      calculateSquare(2, function(error, result) {
        expect(error).toBeNull();
        expect(result).toBe(4);
        done();
      });
  });

  it('Modify try/catch for asynchronous behavior, invoke the error', function (done) {
      calculateSquare('bad number', function(error, result) {
        expect(error).not.toBeNull();
        expect(error.message).toBe('Caught Error: Argument of type number is expected.');
        done();
      });
  });
    /*
    Initially I tried making assertions with the try/catch block but after view the video on testing callbacks from
    the Udemy course Asynchronous Javascript: Promises, Callbacks, Async/Await, I found it was unnecessary to test
    via the try/catch block.  Removing the try/catch block made the tests much more readable as a lot of extra code
    was eliminated.  Additionally, it turned out that the catch block was never invoked, as the try block had all of
    the necessary conditions in the callback.

    I realized from the video (where the testing framework is Mocha/Chai) that all I need to do is to test for
    a normal case, where there is not error and results turns out to be 4 (the square of 2) and for the case in
    which an error is thrown, but again I do not need a try/catch block only to ensure that an error is thrown.

    interestingly I had which had conventional assertions at the end:

     function calculateSquare(number, callback) {
      setTimeout(function() {
        if (typeof  number !== 'number') {
          callback(new Error('Argument of type number is expected.'));
          return;
        }
        const result = number * number;
        callback(null, result);
      }, 1000);
    }

    try {
      calculateSquare('bad number', function(error, result) {
        if (error !== null) {
          ary.push(result);
        }
      });
    } catch(error) {
      str = error.message;
    }
    expect(str).toBe('');

    which when it ran by itself it passed, which was expected since the setTimeout was skipped, however, when run
    as part of a full test suite with the above test, the entire Jest program exited with an Error, and the console
    read "Argument of type number is expected".  This happened because the setTimeout for the first test executed
    asynchronously and threw an error before the entire Jest program finished.  So, in other words, the first test
    passed as the str variables was '' and then Jest moved onto the second test and during the second test the
    setTimeout of the first test finished and then its callback was executed.  Once its call back was executed the
    expected error was thrown and the entire program exited.
     */
});