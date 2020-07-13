import { Emitter } from "../files/E3NodeEventEmitterPartOne/emitter";
import { first, second, third, fourth } from "../files/Miscellaneous/four_functions";

describe('E4 Node Event Emitter Part One My Own Version', function () {
  let typeOne, typeTwo, emitter, results, expected;
  beforeEach(() => {
    typeOne = 'firstGreet';
    typeTwo = 'secondGreet';
    emitter = new Emitter();
    emitter.on(typeOne, first);
    emitter.on(typeOne, second);
    emitter.on(typeTwo, third);
    emitter.on(typeTwo, fourth);
  });

  it('emit type one events', function () {
    results = [emitter.emit(typeOne)].flat();
    expected = ['first function', 'second function'];
    expect(results).toEqual(expected);
  });

  it('emit type two events', function () {
    results = [emitter.emit(typeTwo)].flat();
    expected = ['third function', 'fourth function'];
    expect(results).toEqual(expected);
  });
});