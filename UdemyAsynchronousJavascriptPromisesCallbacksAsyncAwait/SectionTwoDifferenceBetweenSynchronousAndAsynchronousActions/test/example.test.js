const fs = require('fs');
const path = require('path');
import {numberOne, numberTwo, numberThreeSync, numberFour, synchronous} from "../code/example";

describe('Section Two Differences Between Synchronous And Asynchronous Actions', function () {
  let ary, callback, expected, codeDirectory;
  beforeEach(() => {
    ary = [];
    codeDirectory = path.join(__dirname, '..', '/code');
    callback = function(ary, data) {
      ary.push(Number.parseInt(data, 10));
    }
  });
  it('synchronous actions happen in order one after another', function () {
    expected = [1, 2, 3, 4];
    expect(synchronous()).toEqual(expected);
  });

  it('asynchronous execution', function (done) {
    /*
    this test is very important to understand, one must remember two things about Javascript.  First it is
    single threaded and secondly it is asynchronous, so it allows for code to be executed out of order.
    In the assertion below, one has to put the assertion within the callback function of fs.readFile, this is
    because the fs.readFile function will be dispatched in a sequential fashion, but it will not finish in
    sequential order because of the time required for the operating system to go out to disk and fetch the data
    and then return with the data.  This means in terms of the code below, numberOne will execute, followed by
    numberTwo, the fs.readFile will be dispatched, numberFour will execute and finally the callback function will
    execute once the data comes back from the file system.  In order to affirm this order of execution, I have to
    let Jest know to wait before making assertions, this is accomplished with the done function.  When done is
    invoked, Jest will wait for the done invocation before making the assertions.

    I am not sure of the particulars of how the done invocation works, I would like to learn in the future, but
    in this case I can make an educated guess.  By default done will wait at most for 5 seconds, obviously, Jest is
    smart enough to observe that the callback has finished and once that has finished and there is no more code
    in the callback function of fs.readFile then assertions can take place.
     */
    expected = [1, 2, 4, 3];
      numberOne(ary);
      numberTwo(ary);
      fs.readFile(codeDirectory + '/example.txt', 'utf8', function(err, data) {
        callback(ary, data)
        expect(ary).toEqual(expected);
        done();
      });
      numberFour(ary);
  });

  it('fix the asynchronous execution', function (done) {
    /*
    this is another important example, so in order for the array to yield the numbers in order, we have to put the
    numberFour function invocation in the body of the callback of fs.readFile.  Once the data comes back from the
    file system (the contents of example.txt) then the body of the fs.readFile callback is executed sequentially.
    This means that callback(ary, data) will be invoked followed by numberFour(ary) and then the assertion.
     */
    expected = [1, 2, 3, 4];
    numberOne(ary);
    numberTwo(ary);
    fs.readFile(codeDirectory + '/example.txt', 'utf8', function(err, data) {
      callback(ary, data);
      numberFour(ary);
      expect(ary).toEqual(expected);
      done();
    })
  });
});