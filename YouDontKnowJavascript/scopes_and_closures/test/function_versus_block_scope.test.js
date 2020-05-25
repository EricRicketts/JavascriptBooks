describe('You Don\'t Know Javascript: Function Versus Block Scope', function () {
  describe('Hiding Scope', function () {
    let doSomethingVersionOne, doSomethingVersionTwo, doSomethingElse, b;
    beforeEach(() => {
      doSomethingElse = function(a) {
        return a - 1;
      }
      doSomethingVersionOne = function(a) {
        b = a + doSomethingElse(a * 2);
        return 3 * b;
      }

      doSomethingVersionTwo = function(a) {
        function doSomethingElse(a) {
          return a - 1;
        }
        let b;
        b = a + doSomethingElse(a * 2);
        return 3 * b;
      }
    });

    it('should have one function call another', function () {
      expect(doSomethingVersionOne(2)).toBe(15);
    });

    it('using nested scopes to hide scope can be more robust', function () {
      expect(doSomethingVersionTwo(2)).toBe(15);
    });
  });

  describe('Functions as Scopes', function () {
    let a, x, obj;
    beforeEach(() => {
      obj = { a: 1 };
    });
    it('IIFE does not pollute current scope with unnecessary variable name', function () {
      a = 2;
      x = (function foo() {
        // this IIFE creates its own scope apart from the global scope
        let a = 3;
        return a;
      })();
      expect([a, x]).toEqual([2, 3]);
    });

    it('IIFE can take an argument as it is a function call', function () {
      x = (function IIFE(object) {
        let a = 3;
        return [a, obj.a];
      })(obj);
      expect(x).toEqual([3, 1]);
    });

    it('IIFE can reverse the order of definition, execution referred to as Universal Module Definition', function () {
      x = (function IIFE(def) {
        return def(obj);
      })( function def(object) {
        let a = 3;
        return [a, object.a];
      });
      expect(x).toEqual([3, 1]);
    });
  });
});