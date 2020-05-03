describe('Principles Of Object Oriented Javascript Object Patterns: Module Pattern', function () {
  describe('Module Pattern by itself to make private variables', function () {
    let person;
    beforeEach(() => {
      person = (function() {
        let age = 0;

        function getAge() {
          return age;
        }

        function growOlder() {
          age += 1;
        }

        return {
          name: 'Nicholas',
          getAge: getAge,
          growOlder: growOlder
        }
      }());
    });

    it('cannot access local variables directly, only by methods', function () {
      expect([person.age, person.getAge()]).toEqual([undefined, 0]);
    });

    it('can change private variables through methods', function () {
      person.growOlder();
      expect(person.getAge()).toBe(1);
    });
  });

  describe('Module Pattern used with constructor to make private variables', function () {
    let Person, person1, person2;
    beforeEach(() => {
      Person = (function() {
        var age = 0;

        function InnerPerson(name) {
          this.name = name;
        }

        InnerPerson.prototype.getAge = function() {
          return age;
        }

        InnerPerson.prototype.growOlder = function() {
          age += 1;
        }

        return InnerPerson;
      }());

      person1 = new Person('Nicholas');
      person2 = new Person('Greg');
    });

    it('age is a private variable', function () {
      expect([person1.age, person2.age]).toEqual([undefined, undefined]);
    });

    it('age can only be accessed through methods', function () {
      expect([person1.getAge(), person2.getAge()]).toEqual([0, 0])
    });

    it('age changed by calling the appropriate methods, however age is a reference', function () {
      person1.growOlder();
      person2.growOlder();
      person2.growOlder();
      expect([person1.getAge(), person2.getAge()]).toEqual([3, 3]);
    });
  });


});