let obj =  require('../files/C6LetsRunSomeJavascript/index');

describe('import a simple app and run it in node', function () {
  it('c property on obj should evaluate to 13', function () {
    expect(obj.c).toBe(13);
  });
});