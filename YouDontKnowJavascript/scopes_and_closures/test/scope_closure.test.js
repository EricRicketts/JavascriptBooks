import {foo, secondFoo, thirdFoo, secondBar, coolModule, publicAPI, MyModules } from "../code/scope_closure";

describe('You Don\'t Know Javascript: Scopes and Closures', function () {
  describe('Scope Closure', function () {
    it('the function bar has a closure over the inner scope of foo and can access variable a', function () {
       let baz = foo();
       expect(baz()).toBe(2);
    });

    it('another demonstration of closure through another level of indirection', function () {
       let fizz = secondFoo();
       expect(fizz()).toBe(2);
    });

    it('indirection can be by variable assignment, a closure will still be in place', function () {
      thirdFoo(); // this assigns the function function baz to the variable fn which is global in the scope
      // of the scope_closure file
      let buzz = secondBar(); // this invocation returns the variable fn which is a reference to the function
      // baz, now the variable buzz has a reference to the function baz which has a closure over the inner
      // scope of function thirdFoo which has access to the local variable a.
      expect(buzz()).toBe(2);
    });

    it('IIFE according to the accepted definition is not strictly a closure', function () {
      let a = 2;
      let b = (function IIFE() {
        return a;
      })();
      expect(b).toBe(2);
      /*
      So according to You Don't Know Javascript this is not strictly a closure because the function IIFE is
      not executed outside of its lexical scope, it is defined and then immediately called, it is invoked in
      the same scope as it was declared.  The variable a is found during normal lexical lookup not really
      via a closure.
       */
    });
  });

  describe('Modules', function () {
    it('Revealing module pattern, returns object which have functions with closure', function () {
      let foo = coolModule();
      expect([foo.doSomething(), foo.doAnother()]).toEqual(['cool', [1, 2, 3]]);
    });

    it('use the module pattern for a public API', function () {
      expect(publicAPI.identify()).toBe('foo module');
      publicAPI.change();
      expect(publicAPI.identify()).toBe('FOO MODULE');
    });
  });

  describe('Module Pattern', function () {
    beforeEach(() => {
      MyModules.define("bar", [], function() {
        function hello(who) {
          return 'Let me introduce: ' + who;
        }

        return {
          hello: hello
        };
      });

      MyModules.define('foo', ['bar'], function(bar) {
        let hungry = 'hippo';
        function awesome() {
          return bar.hello(hungry).toUpperCase();
        }

        return {
          awesome: awesome
        };
      });
    });

    it('should return a bar module which can be invoked', function () {
      let bar = MyModules.get('bar');
      expect(bar.hello('hippo')).toBe('Let me introduce: hippo');
    });

    it('should return a foo module which can be invoked', function () {
      let foo = MyModules.get('foo');
      expect(foo.awesome()).toBe('LET ME INTRODUCE: HIPPO');
    });
  });
});