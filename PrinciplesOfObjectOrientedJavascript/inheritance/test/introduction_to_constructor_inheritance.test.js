import { Square, AnotherSquare, YetAnotherSquare, Rectangle } from "../code/rectangle_square";

describe('Principles Of Object Oriented Javascript Constructor Inheritance', function () {
   describe('Functions are Objects which have their own prototypes and constructors', function () {
      let obj, func;
      beforeEach(() => {
         obj = {
            fizz: 'buzz',
            foo: 'bar'
         }
         func = function() {
            return 'I am a function';
         }
      });

      it('functions are objects', function () {
         expect(obj instanceof Object).toBe(true);
         expect(func instanceof Object).toBe(true);
      });

      it('however not all objects are functions, as functions are a special kind of object', function () {
         expect(obj instanceof Function).toBe(false);
         expect(func instanceof Function).toBe(true);
      });

      it('like Objects Functions have prototypes', function () {
         expect(!!Object.getPrototypeOf(obj)).toBe(true);
         expect(!!Object.getPrototypeOf(func)).toBe(true);
      });

      it('objects have an object prototype', function () {
         expect(typeof Object.getPrototypeOf(obj)).toBe('object');
      });

      it('functions have a functional prototype, which is an object', function () {
         expect(typeof Object.getPrototypeOf(func)).toBe('function');
         expect(Object.getPrototypeOf(func) instanceof Object).toBe(true);
      });

      it('constructors are always functions', function () {
         expect(typeof Object.getPrototypeOf(obj).constructor).toBe('function');
         expect(typeof Object.getPrototypeOf(func).constructor).toBe('function');
      });
   });

   describe('Constructor Inheritance', function () {
      let rectangle, square, anotherSquare, yetAnotherSquare, results, expected;
      beforeEach(() => {
        rectangle = new Rectangle(10, 20);
        square = new Square(5);
        anotherSquare = new AnotherSquare(10);
        yetAnotherSquare = new YetAnotherSquare(15);
      });

      it('inheriting from the constructor function itself includes the prototype properties', function () {
        results = [];
        expected = ['constructor', 'area', 'toString'];
        for (let property in square) {
           if(!square.hasOwnProperty(property) && property in square) {
              results.push(property);
           }
        }

        expect(results).toEqual(expected);
      });

      it('second inheritance example has constructor as inherited property on prototype', function () {
        /*
        In this case the only properties on the prototype were those inherited from Rectangle, the constructor
        was explicitly set to be AnotherSquare but by default a constructor is not enumerable, so it did not
        show up
         */
        results = [];
        expected = ['area', 'toString'];
        let property;
        for (property in anotherSquare) {
          if (!anotherSquare.hasOwnProperty(property) && property in anotherSquare) {
            results.push(property);
          }
        }
        expect(results).toEqual(expected);

        expect(Object.getPrototypeOf(anotherSquare).hasOwnProperty('constructor')).toBe(true);
        expect(Object.getPrototypeOf(anotherSquare).propertyIsEnumerable('constructor')).toBe(false);
        expect(anotherSquare.hasOwnProperty('length')).toBe(true);
        expect(anotherSquare.hasOwnProperty('width')).toBe(true);
      });

     it('third inheritance example has constructor as inherited property on prototype', function () {
       // constructor will always be a property on the prototype when called with Object.create
       // as will any other property defined with Object.create, which is 'foo' in this case
       // constructor showed up because it was defined to be enumerable unlike the default case above
       results = [];
       expected = ['constructor', 'foo', 'area', 'toString'];
       let property;
       for (property in yetAnotherSquare) {
         if (!yetAnotherSquare.hasOwnProperty(property) && property in yetAnotherSquare) {
           results.push(property);
         }
       }
       expect(results).toEqual(expected);
       expect(Object.getPrototypeOf(yetAnotherSquare).hasOwnProperty('constructor')).toBe(true);
       expect(Object.getPrototypeOf(yetAnotherSquare).propertyIsEnumerable('constructor')).toBe(true);
       expect(yetAnotherSquare.hasOwnProperty('length')).toBe(true);
       expect(yetAnotherSquare.hasOwnProperty('width')).toBe(true);
       expect(yetAnotherSquare.hasOwnProperty('foo')).toBe(false);
     });
   });
});