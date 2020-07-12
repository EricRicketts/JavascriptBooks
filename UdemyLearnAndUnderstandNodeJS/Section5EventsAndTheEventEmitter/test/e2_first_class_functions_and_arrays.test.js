let x = require('../files/E2_FirstClassFunctionsArrays/index');

describe('E2 First Class Functions and Arrays', function () {
  let results, expected;
  it('should allow for variable names to be used as object keys', function () {
    let key = 'greet';
    expected = ['foo', 'foo', 'foo'];
    results = [x.obj.greet, x.obj['greet'], x.obj[key]];
    expect(results).toEqual(expected);
  });

  it('should functions are first class citizens in Javascript', function () {
    expected = ['foo 0', 'foo 1', 'foo 2'];
    results = x.arr.map((fn) => fn());
    expect(results).toEqual(expected);
  });
});