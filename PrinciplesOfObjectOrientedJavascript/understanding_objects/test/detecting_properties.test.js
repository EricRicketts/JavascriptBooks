describe('Principles of Object Oriented Javascript Detecting Properties', function () {
  let person1, person2;
  beforeEach(() => {
    person1 = { name: 'Nicholas', age: 0, gender: 'male' };
    person2 = Object.create(person1);
    person2.height = '6ft';
  });
  it('Insecure way to detect properties leads to undesired falsy values', function () {
    expect(person1.age).toBeFalsy();
  });

  it('correct way to find any property on an object is with in', function () {
    expect("age" in person1).toBe(true);
  });

  it('hasOwnProperty only looks for unique properties on that object', function () {
     expect(person2.hasOwnProperty('height')).toBe(true);
     expect(person2.hasOwnProperty('name')).toBe(false);
  });
});