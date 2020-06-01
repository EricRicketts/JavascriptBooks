describe('You Don\'t Know Javascript this and Object Prototypes', function () {
  let results, expected;
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
      let fooOne, Foo, obj1, obj2, obj3, obj4, obj5, obj6, bar;
      beforeEach(() => {
        fooOne = function () {
          return this.a;
        }
        Foo = function(something) {
          this.a = something;
        }
        obj1 = { a: 2, foo: fooOne };
        obj2 = { a: 3, foo: fooOne };
        obj3 = { foo: Foo };
        obj4 = {};
      });

      it('explicit binding takes precedence over implicit binding', function () {
        results = [obj1.foo(), obj2.foo(), obj1.foo.call(obj2), obj2.foo.call(obj1)];
        expected = [2, 3, 3, 2];
        expect(results).toEqual(expected);
      });

      it('Foo just adds a property without new it is not a constructor', function () {
        bar = obj3.foo(2);
        results = [obj3.a, bar];
        expected = [2, undefined];
        expect(results).toEqual(expected);
      });

      it('Foo can be used via call to set a property on another object', function () {
        obj3.foo.call(obj4, 3);
        expect(obj4.a).toBe(3);
      });

      it('new constructor takes precedence over implicit evaluation', function () {
        obj3.foo(2);
        bar = new obj3.foo(4);
        results = [obj3.a, bar.a];
        expected = [2, 4];
        expect(results).toEqual(expected);
        /*
        We see the constructor operation, Javascript forces the function to return an new object, note in the
        above code it is bar that is the newly created instance.  Had foo been used in normal invocation, such
        as obj3.foo(5), the "a" property on obj3 would have been set to 5, but that is not what happened, the
        new keyword forced an object to be returned.
         */
      });

      it('new constructor takes precedence over hard explicit binding', function () {
        obj5 = {};
        obj6 = Foo.bind(obj5);
        obj6(2);
        bar = new obj6(5);
        results = [obj5.a, bar.a];
        expected = [2, 5];
        expect(results).toEqual(expected);
        /*
        In this case we hard bind the Foo function to obj5, meaning it returns a function that sets the value
        of the "a" property on obj5, so remember obj6 is actually a function.  So when obj6(2) is invoked it
        calls Foo which sets the "a" property of obj5 to the value 2.  Now we call obj6(5) with new, via
        new obj6(5) if hard binding would take precedence then obj5 would have its "a" property set to 5, but
        this does not what happened, instead a new object was returned with its "a" property set to 5 and
        obj5.a still equals 2.  So the constructor takes precedence over explicit binding.
        */
      });
    });
    describe('Binding Issues', function () {
       let obj1, obj2, foo, bar;
       beforeEach(() => {
         foo = function(p1, p2) {
           return p1 + p2;
         }
       });

      it('bind can be used for partial function application', function () {
        bar = foo.bind(null, 'p1');
        expect(bar('p2')).toBe('p1p2');
      });

      it('explicit binding with null or undefined in strict mode', function () {
        foo = function() { return this.a; };
        expect(() => { foo.call(null); }).toThrow(TypeError);
        // null or undefined have no properties, so result is a TypeError, this is in strict mode
      });
    });
  });
});