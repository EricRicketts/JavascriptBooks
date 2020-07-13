import { Person } from "../files/E9InheritingFromTheEventEmitterPartTwo/index";

describe('E9 Inheriting From The Event Emitter Part Two', function () {
  let first, second, person, eventType;
  beforeEach(() => {
    eventType = 'firstEvent';
    first = function() {
      return 'You called the first function.';
    }
    second = function() {
      return 'You called the second function.';
    }
    person = new Person('Elmer', 'Fudd');
    [first, second].forEach((fn) => {
      person.addListener(eventType, fn)
    });
  });

  it('have added listeners to the policeman object', function () {
    let results = person.listeners(eventType).map((listener) => listener());
    let expected = ['You called the first function.', 'You called the second function.'];
    expect(results).toEqual(expected);
  });

  it('should have a first and last name', function () {
    expect(person.greet()).toBe('Hello, Elmer Fudd!');
  });
});