describe('You Don\'t Know Javascript', function () {
  describe('Chapter 3: Objects', function () {
    let results, expected, myObject;
    describe('Property Descriptors', function () {
      it('the property descriptor returns all features of an object\'s property', function () {
        myObject = { a: 2 };
        let results =  Object.getOwnPropertyDescriptor(myObject, "a");
        expected = {
          value: 2,
          writable: true,
          configurable: true,
          enumerable: true
        }
        expect(results).toEqual(expected);
      });

      it('writable attribute to false means the value cannot be changed', function () {
        myObject = { a: 2 };
        Object.defineProperty(myObject, "a", {
          writable: false
        });
        expect(() => { myObject.a = 3; }).toThrow(TypeError);
        /*
          in strict mode, trying to change an object property that is non-writeable will throw an error.
        */
      });

      it('non-configurable property can change value',  () => {
        results = [];
        myObject = { a: 2 };
        results.push(myObject.a);
        Object.defineProperty(myObject, "a", {
          configurable: false
        });
        myObject.a = 4;
        results.push(myObject.a);
        expected = [2, 4];
        expect(results).toEqual(expected);
        /*
          though a non-configurable property can have its value changed as long as it is still writable.  I tried to
          generate an error in the test by trying to delete the non-configurable property but I could not get Jest
          to throw the error when I ran the test.  I do not know enough about asynchronous operations so I gave up.
          But I proved on the NodeJS REPL that one cannot delete a property with configurable set to false.
        */
      });
    });

    describe('Immutability', function () {
      it('one cannot add properties to an extension prevented object', function () {
        myObject = { a: 2 };
        Object.preventExtensions(myObject);
        myObject.a = 4;
        expect(myObject.a).toBe(4);
        expect(() => { myObject.b = 20; }).toThrow(TypeError);
      });
    });
  }); 
});