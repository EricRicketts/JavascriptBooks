describe('You Don\'t Know Javascript this and Object Prototypes', function () {
  describe('Chapter Two: this All Makes Sense Now', function () {
    describe('Default and Implicit Bindings', function () {
      let foo, obj, obj1, obj2, doFoo;
      beforeEach(() => {
        foo = function() {
          return this.a;
        }
        obj = {
          a: 2,
          foo: foo
        }
        obj2 = {
          a: 42,
          foo: foo
        }
        obj1 = {
          a: 10,
          obj2: obj2
        }
        doFoo = function(fn) {
          return fn();
        }
      });

      it('in strict mode standalone function invocation "this" is undefined', function () {
        expect(() => { foo(); }).toThrow(TypeError);
      });

      it('we can only simulate non-strict mode with call', function () {
        globalThis.a = 2;
        expect(foo.call(globalThis)).toBe(2);
        /*
        I am not sure whether it be Babel or Jest itself but all tests are run in 'strict' mode.  We see from
        the first assertion that 'this' is by default undefined in a standalone function invocation and thus
        we get a TypeError as we try to obtain a property from undefined which has not properties.

        In the second case, if 'use strict' were not in use and we were in the browser environment, then any
        variable declaration in the global scope would be putting a property on the global object.  In the
        second assertion I had to simulate this by putting a property on globalThis and then telling Javascript
        to use globalThis explicitly in the function call.
         */
      });

      it('default method execution context uses the calling object as "this"', function () {
        expect(obj.foo()).toBe(2);
      });

      it('the call site right before the function invocation determines the value of "this"', function () {
        expect(obj1.obj2.foo()).toBe(42);
      });

      it('context loss occurs when a variable is assigned the reference to an object and method', function () {
        let bar = obj.foo; // reference to obj's method foo
        expect(() => { bar(); }).toThrow(TypeError);
        /*
        what happens here is that bar is now a reference to the function foo, not the method foo bound to object obj.
        Thus we experience context loss as when bar is called, it uses the default binding for standalone function
        invocation.  Since we are in strict mode, "this" is undefined and a TypeError is thrown.
         */
      });

      it('callbacks can experience context loss', function () {
        expect(() => { doFoo(obj.foo); }).toThrow(TypeError);
        /*
        Remember that parameter passing is just implicit assignment so we have the same effect as the previous
        assertion.  Within the definition of doFoo we have fn = obj.foo which is exactly like the situation where
        we assigned bar, bar = obj.foo.
         */
      });
    });
    describe('Explicit and New Bindings', function () {
      let foo, obj;
      function Foo(a) {
        this.a = a;
      }
      Foo.prototype.incrementBy = function(incrementValue) {
        return this.a + incrementValue;
      }
      beforeEach(() => {
        foo = function(something) {
          return this.a + something;
        }
        obj = { a: 2 };
      });

      it('call uses comma separated arguments', function () {
        expect(foo.call(obj, 4)).toBe(6);
      });

      it('apply uses an array for arguments', function () {
        expect(foo.apply(obj, [4])).toBe(6);
      });

      it('bind permanently ties binds a function to an object, it returns a function', function () {
        let bar = foo.bind(obj);
        expect(bar(10)).toBe(12);
        let obj2 = { a: 10 };
        expect(bar.call(obj2, 10)).toBe(12);
        /*
          Normally we would expect 20 as the output, but bar is permanently bound to obj with the a property
          value set to 2.  Thus we add 10 to 2 and not 10 to 10 which is the a property value for obj2.
        */
      });

      it('new binding sets the return object as the binding for the function call', function () {
        let bar = new Foo(4);
        expect(bar.a).toBe(4);
        expect(bar.incrementBy(4)).toBe(8);
      });
    });
    describe('Order to precedence for binding rules', function () {
      let fooOne, obj1, obj2;
      beforeEach(() => {
        fooOne = function () {
          return this.a;
        }
        obj1 = { a: 2, foo: fooOne };
        obj2 = { a: 3, foo: fooOne };
      });
    });
  });
});