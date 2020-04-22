import { sayNameForAllWithLabel } from "../code/say_name";
describe('Determine this from context', function () {
  let sayNameForAll, person1, person2, foo, bar;
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
    foo = function() {
      return this;
    }
    globalThis.a = 'Global';
    bar = function() {
      return globalThis.a;
    }
  });

  it('should identify "this" in global context, which is undefined in strict mode', function () {
    expect(foo()).toBe(undefined);
  });

  it('should return properties assigned to the global object', function () {
    expect(bar()).toBe('Global');
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

  it('should bind only once', function () {
    function f() {
      return this.a;
    }
    /*
    We see here that g is permanently bound to the object { a: 'azerty' }
    so when h attempts to bind to { a: 'yoo' } it does not bind to the
    passed in object because g is permanently bound to { a: 'azerty' }
     */
    var g = f.bind({ a: 'azerty' }); // returns an object permanently bound to
    var h = g.bind({ a: 'yoo' })
    expect(g()).toBe('azerty');
    expect(h()).toBe('azerty');
  });
});