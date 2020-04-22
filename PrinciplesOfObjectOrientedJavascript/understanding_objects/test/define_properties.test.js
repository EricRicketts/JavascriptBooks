describe('Principles Of Object Oriented Javascript Defining Properties', function () {
  let person1, person2, person3, expected;
  beforeEach(() => {
    person1 = {
      name: 'Nicholas'
    }
    person3 = person1;
    person2 = new Object();
    person2.name = 'Nicholas';
  });

  it('person1, person2, and person should all have a name property', function () {
    expected = [['name'], ['name'], ['name']];
    let objects = [person1, person2, person3];
    let result = [];
    objects.forEach((obj) => {
     result.push(Object.keys(obj));
    });
    expect(result).toEqual(expected);
  });

  it('person3 is a copy of person1, changes in person1 should show up in person3', function () {
    person1.age = 35;
    expected = [35, 35];
    expect([person1.age, person3.age]).toEqual(expected);
  });

  it('person2 is not a copy of person1 it is an entirely different object', function () {
    person1.age = 35;
    expected = [35, undefined];
    expect([person1.age, person2.age]).toEqual(expected);
  });
});