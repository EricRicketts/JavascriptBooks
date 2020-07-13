import { Person } from "../files/E9InheritingFromTheEventEmitterPartTwo/index";
import { EventEmitter } from 'events';
import { inherits } from 'util';

describe('E9 Inheriting From The Event Emitter Part Two', function () {
  let first, second, person, eventType;
  beforeEach(() => {
    eventType = 'firstEvent';
    inherits(Person, EventEmitter);
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
});