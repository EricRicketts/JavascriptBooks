import { Person } from '../files/E10ES6Classes/index';

describe('E10 ES6 Classes', function () {
  let first, second, person, eventType, results, expected;
  beforeEach(() => {
    eventType = 'event';
    first = function() {
      return 'first function';
    }
    second = function() {
      return 'second function';
    }
    person = new Person('Elmer', 'Fudd');
    [first, second].forEach((fn) => {
      person.addListener(eventType, fn);
    })
  });

  it('should have the behavior of the Event Emitter', function () {
    results = person.listeners(eventType).map((listener) => listener());
    expected = ['first function', 'second function'];
    expect(results).toEqual(expected);
  });

  it('person object should have the defined properties', function () {
    expect(person.greet()).toBe('Hello, Elmer Fudd!');
  });
});