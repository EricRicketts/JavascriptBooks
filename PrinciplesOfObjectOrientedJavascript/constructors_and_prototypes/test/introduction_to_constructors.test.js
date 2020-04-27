import { Person } from "../code/person";
import { AnotherPerson, Asian, Caucasian } from "../code/person_using_prototypes";

describe('Principles Of Object Oriented Javascript Introduction To Constructors', function () {
  function Rabbit() {}
  Rabbit.prototype = {
    eats: true
  }
  let firstPerson, personPrototype, secondPerson, caucasian, asian, rabbit, expected, results;
  beforeEach(() => {
    firstPerson = new Person('Leif Erikson', 35);
    personPrototype = Person.prototype;
    secondPerson = new AnotherPerson('Fudd', 'Elmer', 40, 'male');
    rabbit = new Rabbit();
    caucasian = new Caucasian('Rule', 'Rick', 50, 'male');
    asian = new Asian('Lee', 'Chris', 40, 'male');
  });

  describe('Constructor Function characteristics', function () {
    it('constructors generate an object when called with new', function () {
      expect(typeof firstPerson).toBe('object');
    });

    it('Constructors have an actual prototype property called "prototype" which are objects', function () {
      expect(typeof personPrototype).toBe('object');
    });

    it('each prototype object has only one property a constructor property', function () {
       expect(Object.getOwnPropertyNames(personPrototype)).toEqual(['constructor']);
    });

    it('just like literal objects the constructor of the prototype is a function', function () {
      expect(typeof personPrototype.constructor).toBe('function');
    });

    it('by default the constructor function points back to the original function', function () {
      expect(personPrototype.constructor.name).toBe('Person');
    });

    it('the prototype property of an instance of a constructor is the prototype of the constructor', function () {
      expect(Object.getPrototypeOf(secondPerson)).toBe(AnotherPerson.prototype);
    });
  });

  describe('Modifying the Rabbit constructor', function () {
    it('Rabbit\'s constructor was set to Object', function () {
      expect(Rabbit.prototype.constructor.name).toBe('Object');
    });

    it('modifying an existing property of the existing prototype property affects all objects', function () {
      Rabbit.prototype.eats = false;
      expect(rabbit.eats).toBe(false);
    });

    it('constructor modification only affects objects created after the constructor was changed', function () {
      Rabbit.prototype = {}
      expect(rabbit.eats).toBe(true);
      let secondRabbit = new Rabbit();
      expect(secondRabbit.eats).toBe(undefined);
    });

    it('prototype properties cannot be deleted', function () {
      delete rabbit.eats;
      expect(rabbit.eats).toBe(true);
    });

    it('You can delete prototype properties on the constructor and it affect existing objects', function () {
      delete Rabbit.prototype.eats;
      expect(rabbit.eats).toBe(undefined);
    });
  });

  describe('AnotherPerson constructor', function () {
    it('By default constructors point to the constructor function itself', function () {
      function Foo() {}
      Foo.prototype.bar = 'bar';
      expect(Foo.prototype.constructor.name).toBe('Foo');
    });

    it('Since AnotherPerson prototype set to an object, constructor was explicitly set', function () {
      expect(AnotherPerson.prototype.constructor.name).toBe('AnotherPerson');
    });

    it('calling the properties of another constructor does not change the default constructor', function () {
      expect(caucasian.constructor.name).toBe('Caucasian');
      expect(asian.constructor.name).toBe('Asian');
    });

    it('"onw" properties exist even when calling another constructor', function () {
      expected = ['age', 'firstName', 'gender', 'lastName', 'race'];
      results = [Object.keys(caucasian), Object.keys(asian)];
      results.forEach((arrOfProperties) => {
        expect(arrOfProperties.sort()).toEqual(expected);
      });
    });

    it('prototypical properties are not "own" properties', function () {
       results = [];
       for (let property in secondPerson) {
         if (!secondPerson.hasOwnProperty(property)) {
           results.push(property);
         }
       }
       expect(results).toEqual(['constructor', 'fullName', 'greet']);
    });

    it('adding prototype properties to the constructor is immediately available to all instances', function () {
      AnotherPerson.prototype.add = function(a, b) {
        return Number(a) + Number(b);
      }

      expect(secondPerson.add(2, 3)).toBe(5);
    });
  });
});