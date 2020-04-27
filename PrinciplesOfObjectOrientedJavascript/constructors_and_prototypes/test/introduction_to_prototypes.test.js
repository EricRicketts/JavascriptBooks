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

    it('for literal objects hasOwnPropertyNames only returns "own" properties', function () {
      let animalProperties = Object.getOwnPropertyNames(animal);
      expected = ['eats', 'name', 'walk'];
      expect(animalProperties.sort()).toEqual(expected);
    });

    it('the prototype property is hidden but can be directly accessed by __proto__', function () {
      let animalProperties = Object.getOwnPropertyNames(animal);
      expect(animalProperties.includes('__proto__')).toBe(false);
      expect(animalPrototype).toEqual(animal.__proto__);
    });
  });

  describe('Prototype is an object and there is only one value for a prototype', function () {
    it('prototype property is an object', function () {
      expect(typeof longEarPrototype).toBe('object');
    });

    it('if the prototype property is inherited it will point to the immediate parent object', function () {
      expect(longEarPrototype).toEqual(rabbit);
      expect(rabbitPrototype).toEqual(animal);
      expect(longEarPrototype).not.toEqual(animal);
    });

    it('all literal object constructors are functions', function () {
      results = [
        typeof  longEarPrototype.constructor, typeof  rabbitPrototype.constructor,
        typeof  animalPrototype.constructor
      ];
      expected = ['function', 'function', 'function'];
      expect(results).toEqual(expected);
    });

    it('calling a literal object constructor will return an empty object', function () {
      expect(animalPrototype.constructor()).toEqual({});
    });

    it('object inheritance allows one to work up the prototype chain', function () {
      let objectPrototype = Object.getPrototypeOf(Object);
      results = [
        longEarPrototype.name, rabbitPrototype.name,
        animalPrototype.constructor.name, objectPrototype.constructor.name
      ];
      expect(results).toEqual(['rabbit', 'animal', 'Object', 'Function']);
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
      expect(typeof foo.prototype).toBe('string');
    });
  });
});