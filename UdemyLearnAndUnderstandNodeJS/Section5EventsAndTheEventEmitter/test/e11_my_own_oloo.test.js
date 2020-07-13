import { Person } from '../files/E11MyOwnOLOO/index';

describe('E11 My Own OLOO', function () {
  let first, second, person, results, expected, eventType;
  beforeEach(() => {
    eventType = 'event';
    first = function() {
      return 'first function';
    }
    second = function() {
      return 'second function';
    }
    person = Object.create(Person);
    [person.firstName, person.lastName] = ['Elmer', 'Fudd'];
    [first, second].forEach((fn) => {
      person.addListener(eventType, fn);
    })
  });

  it('should have Event Emitter behavior', function () {
    results = person.listeners(eventType).map((listener) => listener());
    expected = ['first function', 'second function'];
    expect(results).toEqual(expected);
  });

  it('Person still has its own properties', function () {
    expect(person.greet()).toBe('Hello, Elmer Fudd!');
  });
});