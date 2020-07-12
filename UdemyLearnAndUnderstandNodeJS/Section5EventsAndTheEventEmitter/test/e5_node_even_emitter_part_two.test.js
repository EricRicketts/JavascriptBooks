import { EventEmitter } from 'events';
import { first, second, third, fourth } from "../files/Miscellaneous/four_functions";

describe('E5 Node Event Emitter Part Two Actual NodeJS Version', function () {
  let typeOne, typeTwo, emitter, results, expected;
  beforeEach(() => {
    typeOne = 'firstGreet';
    typeTwo = 'secondGreet';
    emitter = new EventEmitter();
    emitter.on(typeOne, first);
    emitter.on(typeOne, second);
    emitter.on(typeTwo, third);
    emitter.on(typeTwo, fourth);
  });

  it('emit type one events for Node', function () {
    results = emitter.listeners(typeOne).map((listener) => listener());
    expected = ['first function', 'second function'];
    expect(results).toEqual(expected);
  });

  it('emit type two events for Node', function () {
    results = emitter.listeners(typeTwo).map((listener) => listener());
    expected = ['third function', 'fourth function'];
    expect(results).toEqual(expected);
  });
});