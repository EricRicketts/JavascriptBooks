let greeting = require('../files/D2FirstClassFunctions/index');

describe('Udemy Learn and Understand NodeJS', function () {
  describe('Javascript Aside: First Class Functions and Function Expressions', function () {
    it('functions can be invoked', function () {
      expect(greeting.greet()).toBe('Hi!');
    });

    it('As first class citizens functions can be used as arguments to other functions', function () {
      expect(greeting.greetMe).toBe('Hi, Eric!');
    });

    it('functions can be immediately invoked the the results stored in a variable', function () {
      expect(greeting.greetNow).toBe('Hi, Wendy!');
    });
  });
});