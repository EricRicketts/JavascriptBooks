let greetings = require('../files/D11_ModulePatterns/index');

describe('D11 Module Patterns', function () {
  it('entire exports is a function', function () {
    expect(greetings.greet1()).toBe('greet1: Hello World!');
  });

  it('add a property to module.exports', function () {
    expect(greetings.greet2()).toBe('greet2: Hello World!');
  });

  it('constructor in modules returns an object', function () {
    expect(greetings.greet3.greet()).toBe('greet3: Hello World!');
  });

  it('export constructor to create objects', function () {
    let greet4 = new greetings.greet4();
    expect(greet4.greet()).toBe('greet4: Hello World!');
  });

  it('modules create closures over local variables', function () {
    expect(greetings.greet5.greet()).toBe('greet5: Hello World!');
  });
});