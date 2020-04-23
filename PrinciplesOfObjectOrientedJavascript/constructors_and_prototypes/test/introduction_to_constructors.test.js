import { Person } from "../code/person";

describe('Principles Of Object Oriented Javascript Introduction To Constructors', function () {
  let person1, person2, results, expected;
  beforeEach(() => {
    person1 = new Person('Elmer Fudd', 35);
    person2 = new Person('Daffy Duck', 27);
  })

  it('should create unique objects with same properties but different values', function () {
    results = [person1.name, person1.age, person2.name, person2.age];
    expected = ['Elmer Fudd', 35, 'Daffy Duck', 27];
    expect(results).toEqual(expected);
    results = [person1.sayName(), person2.sayName()];
    expected = ['Hello, my name is Elmer Fudd.', 'Hello, my name is Daffy Duck.'];
    expect(results).toEqual(expected);
  });

  it('should create instances with their own properties', function () {
    results = [
      person1.hasOwnProperty('name'), person1.hasOwnProperty('age'),
      person1.hasOwnProperty('sayName'), person2.hasOwnProperty('name'),
      person2.hasOwnProperty('age'), person2.hasOwnProperty('sayName')
    ];
    expected = [true, true, true, true, true, true];
    expect(results).toEqual(expected);
  });
});