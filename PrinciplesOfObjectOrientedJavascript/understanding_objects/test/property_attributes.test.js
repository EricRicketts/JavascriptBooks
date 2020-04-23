describe('Principles Of Object Oriented Javascript Understanding Objects Property Attributes', function () {
  let person1, person2, property;
  beforeEach(() => {
    person1 = {};
    Object.defineProperty(person1, "name", {
      enumerable: true,
      configurable: true
    });
    person2 = {
      name: 'Nicholas',
      gender: 'male',
      age: 35,
      country: 'USA'
    }
  });
  describe('Common Attributes for Data and Accessor Properties', function () {
    it('person1 should have a name property', function () {
      property = Object.keys(person1)[0];
      expect(property).toBe('name');
    });

    it('should be able to change the enumerable property', function () {
      Object.defineProperty(person1, "name", {
        enumerable: false
      });
      property  = Object.keys(person1)[0];
      expect(person1.propertyIsEnumerable("name")).toBe(false);
    });

    it('should be able to change the configurable property', function () {
      Object.defineProperty(person1, "name", {
        configurable: false
      });
      expect(() => { delete person1.name }).toThrow(TypeError);
    });
  });

  describe('Data Attributes must be fully defined using defineProperty', function () {
    it('standard way to fully define a data property', function () {
      Object.defineProperty(person1, 'gender', {
        value: 'male',
        writable: true,
        enumerable: true,
        configurable: true
      });
      expect(person1.gender).toBe('male');
      expect(person1.propertyIsEnumerable('gender')).toBe(true);
    });

    it('defining only one attribute leaves others as fasle', function () {
      Object.defineProperty(person1, 'gender', {
        value: 'male'
      });
      expect(person1.gender).toBe('male');
      expect(() => { delete person1.gender }).toThrow(TypeError);
      expect(person1.propertyIsEnumerable('gender')).toBe(false);
    });
  });

  describe('Get all of a properties attributes', function () {
    it('should get all property attributes', function () {
      Object.defineProperty(person1, 'gender', {
        value: 'male',
        writable: true,
        enumerable: true,
        configurable: true
      });
      let properties = Object.getOwnPropertyDescriptor(person1, 'gender');
      let result = [properties.value, properties.writable, properties.enumerable, properties.configurable];
      let expected = ['male', true, true, true];
      expect(result).toEqual(expected);
    });
  });

  describe('Object Extensibility', function () {
    it('Extensibility means no more properties can be added to an object', function () {
      Object.preventExtensions(person2);
      expect(() => { person2.foo = 'bar' }).toThrow(TypeError);
    });

    it('Extensibility means current properties can be modified or deleted', function () {
      Object.preventExtensions(person2);
      person2.name = 'Elmer';
      expect(person2.name).toBe('Elmer');
      delete person2.gender;
      let properties = Object.keys(person2);
      expect(properties.includes('gender')).toBe(false);
    });
  });

  describe('Object Sealing', function () {
    it('should be non extensible and properties cannot be removed', function () {
      Object.seal(person2);
      expect(Object.isExtensible(person2)).toBe(false);
      expect(() => { delete person2.name }).toThrow(TypeError);
    });

    it('does allow for reading and writing of the object', function () {
      Object.seal(person2);
      person2.age = 45;
      expect(person2.age).toBe(45);
    });
  });

  describe('Object Freezing', function () {
    it('should only allows for reading of properties', function () {
      Object.freeze(person2);
      expect(Object.isExtensible(person2)).toBe(false);
      expect(Object.isSealed(person2)).toBe(true);
      expect(person2.name).toBe('Nicholas');
      expect(() => { person2.name = 'Mike' }).toThrow(TypeError);
    });

  });
});