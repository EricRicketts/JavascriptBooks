describe('You Don\'t Know Javascript', function () {
  describe('Chapter 3: Objects', function () {
    describe('Enumeration and Iteration', function () {
      let myObject, results, expected;
      describe('Enumeration', function () {
        beforeEach(() => {
          myObject = {};
          Object.defineProperty(myObject, "a",
            {
              enumerable: true,
              configurable: true,
              writable: true,
              value: 2
          });
          Object.defineProperty(myObject, "b",
             {
              enumerable: false,
              configurable: true,
              writable: true,
              value: 3
          });
        });

        it('non-enumerable values are still accessible and are "own" properties', function () {
          expected = [true, true];
          results = ["b" in myObject, myObject.hasOwnProperty("b")];
          expect(results).toEqual(expected);
        });

        it('non-enumerable properties do not show up in certain loops', function () {
          results = [];
          for (let prop in myObject) {
            results.push(prop, myObject[prop])
          }
          results.push(myObject.propertyIsEnumerable("b"))
        });
        expected = ["a", 2, false];
        expect(results).toEqual(expected);
      });
    });
  });
});