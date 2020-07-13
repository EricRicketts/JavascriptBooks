import { EventEmitter } from 'events';
import { first, second, third, fourth } from "../files/Miscellaneous/four_functions";

describe('E5 Node Event Emitter Part Two Actual NodeJS Version', function () {
  let typeOne, typeTwo, emitter, results, expected, eventTypes;
  beforeEach(() => {
    eventTypes = {
      one: 'firstGreet',
      two: 'secondGreet'
    }
    emitter = new EventEmitter();
    emitter.on(eventTypes.one, first);
    emitter.on(eventTypes.one, second);
    emitter.on(eventTypes.two, third);
    emitter.on(eventTypes.two, fourth);
  });

  it('emit type one events for Node', function () {
    results = emitter.listeners(eventTypes.one).map((listener) => listener());
    expected = ['first function', 'second function'];
    expect(results).toEqual(expected);
  });

  it('emit type two events for Node', function () {
    results = emitter.listeners(eventTypes.two).map((listener) => listener());
    expected = ['third function', 'fourth function'];
    expect(results).toEqual(expected);
  });
});