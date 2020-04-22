describe('Principles Of Object Oriented Javascript Deleting Properties', function () {
  let person1;
  beforeEach(() => {
    person1 = { name: 'Nicholas', gender: 'male', age: 35 };
  });

  it('setting property to null does not remove property', function () {
    person1.age = null;
    expect("age" in person1).toBe(true);
  });

  it('to remove a property use the delete operator', function () {
    delete person1.age;
    expect("age" in person1).toBe(false);
  });
});