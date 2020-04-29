describe('Principles of Object Oriented Javascript Inheritance', function () {
  describe('All Objects inherit from Object.prototype', function () {
    let book;
    beforeEach(() => {
      book = {
        title: 'Principles of Object Oriented Javascript'
      }
    });
    
    it('objects [[Prototype]] are automatically set to Object.prototype', function () {
      expect(Object.getPrototypeOf(book)).toBe(Object.prototype);
    });

    it('Object inherit methods from Object.prototype', function () {
      let prototype = Object.getPrototypeOf(book);
      let properties = Object.getOwnPropertyNames(prototype);
      let expected = ['constructor', '__defineGetter__', '__defineSetter__', 'hasOwnProperty',
        '__lookupGetter__', '__lookupSetter__', 'isPrototypeOf', 'propertyIsEnumerable',
        'toString', 'valueOf', '__proto__', 'toLocaleString'
      ];
      expect(properties).toEqual(expected);
    });
  });

  describe('Literal Objects can inherit from one another', function () {
    let person1, person2;
    beforeEach(() => {
      person1 = {
        name: 'Nicholas',
        sayName: function() {
          return 'Hello, my name is ' + this.name + '.';
        }
      }
      person2 = Object.create(person1, {
        name: {
          configurable: true,
          value: 'Greg',
          enumerable: true,
          writable: true
        }
      });
    });

    it('"own" properties take precedence over inherited properties', function () {
      expect(person2.hasOwnProperty('name')).toBe(true);
    });

    it('one can identify the inherited properties for a given object', function () {
       let inheritedProperties = [];
       for (let property in person2) {
         if(!person2.hasOwnProperty(property)) {
           inheritedProperties.push(property);
         }
       }
       expect(inheritedProperties).toEqual(['sayName']);
    });

    it('deleting an "own" property defaults to inherited property if of the same name', function () {
      delete person2.name;
      expect(person2.hasOwnProperty('name')).toBe(false);
      expect(person2.name).toBe('Nicholas');
      person1.name = 'Bob';
      expect([person1.name, person2.name]).toEqual(['Bob', 'Bob']);
    });

    it('inheriting object\'s prototype points to parent prototype', function () {
      expect(Object.getPrototypeOf(person2)).toEqual(person1);
    });
  });
});