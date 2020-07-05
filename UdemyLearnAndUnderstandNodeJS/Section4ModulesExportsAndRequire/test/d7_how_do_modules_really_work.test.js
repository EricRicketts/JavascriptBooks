let greet = require('../files/D7ModuleExportsAndRequire/greet');

describe('Node import methods', function () {
  it('should import the greet function', function () {
    expect(greet()).toBe('Hello!');
  });
});