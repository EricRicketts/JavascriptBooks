import { greet, logGreeting, greetMe } from "../files/D2FirstClassFunctions/Starter/app";

describe('Udemy Learn and Understand NodeJS', function () {
  describe('Section Four: Modules, Exports, and Requires', function () {
    describe('Javascript Aside: First Class Functions and Function Expressions', function () {
      it('functions can be invoked', function () {
        expect(greet()).toBe('Hi!');
      });

      it('As first class citizens functions can be used as arguments to other functions', function () {
        expect(logGreeting(greet)).toBe('Hi!');
      });

      it('function expressions can create variables which reference functions', function () {
        expect(greetMe()).toBe('Hi Tony!');
      });

      it('function expressions can be used as arguments to a function', function () {
        expect(logGreeting(function() { return 'Hello!'; })).toBe('Hello!');
      });
    });
  }); 
});