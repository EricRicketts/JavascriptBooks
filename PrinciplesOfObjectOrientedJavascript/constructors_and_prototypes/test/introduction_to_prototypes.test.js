import { animal, rabbit, longEar } from "../code/animals";

describe('Principles Of Object Oriented Javascript Prototype Property', function () {
  let results, expected, inherited, own, longEarPrototype, rabbitPrototype, animalPrototype;
  beforeEach(() => {
    longEarPrototype = Object.getPrototypeOf(longEar);
    rabbitPrototype = Object.getPrototypeOf(rabbit);
    animalPrototype = Object.getPrototypeOf(animal);
  });
  describe('Distinguish between own and inherited properties', function () {
    it('keys gives only own properties', function () {
      results = [Object.keys(longEar), Object.keys(rabbit)].flat();
      expected = ['earLength', 'name', 'jump', 'name'];
      expect(results).toEqual(expected);
    });

    it('for in iterates over own and inherited properties', function () {
      inherited = [];
      own = [];
      for (let property in longEar) {
        longEar.hasOwnProperty(property) ? own.push(property) : inherited.push(property);
      }
      expect(own.sort()).toEqual(['earLength', 'name']);
      expect(inherited.sort()).toEqual(['eats', 'jump', 'walk']);
    });

    it('properties with the same name are not inherited', function () {
      inherited = [];
      own = [];
      for (let property in longEar) {
        longEar.hasOwnProperty(property) ? own.push(property) : inherited.push(property);
      }
      expect(inherited.includes('name')).toBe(false);
    });
  });

  describe('Prototype is an object and there is only one value for a prototype', function () {
    it('prototype property is an object', function () {
      expect(typeof longEarPrototype).toBe('object');
    });

    it('all object literal constructors point to Object', function () {
      results = [
        longEarPrototype.constructor.name, rabbitPrototype.constructor.name,
        animalPrototype.constructor.name
      ];
      expected = ['Object', 'Object', 'Object'];
      expect(results).toEqual(expected);
    });

    it('work up the prototype chain', function () {
      let objectPrototype = Object.getPrototypeOf(Object);
      results = [
        longEarPrototype.name, rabbitPrototype.name,
        animalPrototype.constructor.name, objectPrototype.constructor.name
      ];
      expect(results).toEqual(['rabbit', 'animal', 'Object', 'Function']);
    });

    it('constructor of all literal objects are Object', function () {
      results = [
        longEarPrototype.constructor.name, rabbitPrototype.constructor.name,
        animalPrototype.constructor.name,
      ];
      expected = ['Object', 'Object', 'Object'];
      expect(results).toEqual(expected);
    });

    it('For literal objects "prototype" is just another key, it has no effect on inheritance', function () {
      let foo = {
        bar: 'bar',
        prototype:rabbit
      };
      expect(Object.getPrototypeOf(foo).constructor.name).toBe('Object');
      expect(foo.prototype).toEqual(rabbit);
      foo.prototype = 'fizzbuzz';
      expect(foo.prototype).toBe('fizzbuzz');
    });
  });
});