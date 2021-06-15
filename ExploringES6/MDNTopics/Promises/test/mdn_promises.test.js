import { myJSONPlaceholderRequest, singlePromise, chainedPromises } from "../code/promises";

describe('MDN Promises Documentation', function () {
  let f, p, arr, url, promiseXhr, results, expected;

  describe('Basic Promise Functionality', function () {
    beforeEach(() => {
      promiseXhr = myJSONPlaceholderRequest;
      url = 'https://jsonplaceholder.typicode.com/todos/1';
      arr = [];
      f = function(fulfilled, value, arr) {
        return new Promise(function(resolve, reject) {
          if (fulfilled) {
            arr.push(value);
            resolve(value);
          } else {
            arr.push(-1*value);
            reject(value);
          }
        });
      }
      p = f(true, 5, arr);
    });
    /*
      The important thing to remember is using Promises is that there is no standard way, via the Promise API,
      the access the internal state of a Promise.  When a Promise is fulfilled the "then" action will then be
      invoked on a fulfilled Promise.

      It is very important to understand how the Promise constructor works, if one understands this, then it becomes
      very easy to use Promises.  The syntax for a Promise object is: new Promise(executor).  The executor itself is
      a function with the following signature: function(fulfilledFunction, rejectionFunction) {}.  This executor
      function is called by the Promise constructor during the process of creating a new Promise object.  It is the
      job of the developer to write the executor function.

      When the Promise constructor generates a new Promise object it also generates a corresponding pair of functions,
      the fulfilledFunction and the rejectionFunction.  The documentation says these are "tethered" to the resulting
      Promise object generated by the constructor.  It is "tethered" to the Promise object in the following manner.
      The code within the executor, which is typically code written by the developer and is more then likely an
      asynchronous operation, eventually terminates and then either calls fulfilledFunction or rejectionFunction.  The
      calling of either the fulfilledFunction or rejectionFunction is the way the Promise object reflects the outcome
      of the code written in the body of the executor function.

      Another very important concept, the executor has no meaningful return value.  It communicates with the Promise
      object by the side effects caused by calling either fulfilledFunction or rejectionFunction.  This side effect
      is that the Promise becomes "settled" (that is if the value passed to the fulfilledFunction is not a Promise).

      The fulfilledFunction takes one parameter, "value", which can be anything.  This value is passed back to the
      tethered Promise object.  If attached the Promise object will invoke the ".then()" associated with it including
      "value" as an argument.

      For my own benefit, I prefer to specifically define the various Promise states:

      1.  Pending: This is the initial state of the Promise, it is neither fulfilled or rejected.
      2.  Fulfilled: The operation in the executor function was completed successfully.
      3.  Rejected: The operation in the executor function failed.
      4.  Resolved: The operation is either fulfilled or rejected but not settled and not pending.
      5.  Settled: The operation is either fulfilled or rejected, not pending, and must have a value (which can be
      undefined), and is immutable.
    */
    it('f should return a promise', function () {
      expect(p.constructor.name).toBe('Promise');
    });

    it('p should resolve to the given value', function () {
      return expect(p).resolves.toBe(5);
    });

    it('p should resolve to the given value, tested another way', function () {
      return p.then(value => {
        expect(value).toBe(5);
      });
    });

    it('calling promiseXhr should return an object', function() {
      /*
      This test is very important for understanding how the Promise constructor works.  If you go to the code
      associated with the promiseXhr object you will see that the executor function creates an XMLHttpRequest
      and upon completion it either calls the fulfilled function or the rejected function which are functions
      generated by the Promise constructor.

      Note, and this is very important, XMLHttpRequest provides callbacks, in this case I used both the "onload"
      and "onerror" callbacks.  These callbacks take an event object as a parameter.  I call properties on this
      event object and pass the event.target.response property to the fulfilled function and the
      event.target.statusText to the rejected function.  The fulfilled or rejected functions then pass these
      arguments as parameters to the ".then()" or ".catch()" functions.  Note "result" was generated internally,
      in this case it was the response object returned from the API call to https://jsonplaceholder.typicode.com/.
      */
      expected = { completed: false, id: 1, title: "delectus aut autem", userId: 1 };
      return promiseXhr(url).then(result => {
        expect(result).toEqual(expected);
      });
    });
  });

  describe('Chained Promises', function () {
    it('should be able to test the end result of a chained promise', function () {
      expected = [0, 1, 2];
      return chainedPromises(true).resolve().then(data => expect(data).toEqual(expected));
    });
  });
});