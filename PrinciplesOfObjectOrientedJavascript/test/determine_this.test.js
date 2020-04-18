import { sayNameForAllWithLabel } from "../code/say_name";

describe('Determine this from context', function () {
  let sayNameForAll, person1, person2;
  beforeEach(() => {
    sayNameForAll = function() {
      return this === undefined ? undefined : this.name;
    }
    person1 = {
      name: 'Nicholas',
      sayName: sayNameForAll
    }
    person2 = {
      name: 'Greg',
      sayName: sayNameForAll
    }
  });

  it('should give the name of the person1 object', function () {
    expect(person1.sayName()).toBe('Nicholas');
  });

  it('should give the name of the person2 object', function () {
    expect(person2.sayName()).toBe('Greg');
  });

  it('should give the name of the global object', function () {
    expect(sayNameForAll()).toBe(undefined);
  });

  it('should switch context with keyword call', function () {
    expect(sayNameForAll.call(person1)).toBe('Nicholas');
  });

  it('should switch context with keyword apply', function () {
    expect(sayNameForAll.apply(person2)).toBe('Greg');
  });

  it('should bind to object person1', function () {
    let sayNameOfPersonOne = sayNameForAllWithLabel.bind(person1);
    expect(sayNameOfPersonOne('person1')).toBe('person1:Nicholas');
  });

  it('should bind to object person2', function () {
    let sayNameOfPersonTWo = sayNameForAllWithLabel.bind(person2, "person2");
    expect(sayNameOfPersonTWo()).toBe('person2:Greg');
  });
});