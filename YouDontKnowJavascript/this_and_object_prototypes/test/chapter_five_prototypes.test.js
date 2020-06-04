describe('You Don\'t Know Javascript', function () {
  describe('this and Object Prototypes', function () {
    describe('Chapter 5: Prototypes', function () {
      let myObject, anotherObject, Foo, Bar, results, expected;
      describe('[[Prototype]] property on objects', function () {
        beforeEach(() => {
          anotherObject = { a: 1, b: 2 };
          myObject = Object.create(anotherObject, {
            c: {
              writable: true,
              enumerable: true,
              configurable: true,
              value: 3
            }
          });
        });

        it('properties from prototype and not "own" properties', function () {
          results = Object.getOwnPropertyNames(myObject);
          expected = ["c"];
          expect(results).toEqual(expected);
        });

        it('for .. in loop looks at all properties including inherited properties', function () {
          let object = Object.create(myObject);
          object.d = 4;
          results = [];
          for (let prop in object) {
            results.push(prop);
          }
          expected = ["a", "b", "c", "d"];
          expect(results.sort()).toEqual(expected);
        });

        it('literal objects have Object.prototype as their [[Prototype]] property', function () {
          expect(Object.getPrototypeOf(anotherObject) === Object.prototype).toBe(true);
        });

        it('The [[Prototype]] Property of Object.prototype is null', function () {
          expect(Object.getPrototypeOf(Object.prototype)).toBeNull();
        });

        it('shadowing occurs when lower level object has the same property', function () {
          myObject.a++;
          results = [myObject.a, anotherObject.a];
          expected = [2, 1];
          expect(results).toEqual(expected);
          /*
           In this case property "a" does not exist on myObject but through the prototype chain, in this case the
           operation is just like myObject.a = myObject.a + 1; so the initial value if the prototype value for "a"
           is used and then a new "own" property of "a" is created for myObject and assigned the value of 2.  However,
           the prototype property remains unchanged.  The bottom line is to avoid shadowing whenever possible.
          */
        });
      });
    });
  }); 
});