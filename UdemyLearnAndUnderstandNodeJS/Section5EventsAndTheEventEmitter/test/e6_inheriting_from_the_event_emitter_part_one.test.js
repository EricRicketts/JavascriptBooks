import { eventType, firstGreet, Greeter } from "../files/E6InheritingFromTheEventEmitterPartOne/index";

describe('E6 Inheriting From The Event Emitter Part One', function () {
  let greeter1, secondGreet, results;
  beforeEach(() => {
    greeter1 = new Greeter();
    greeter1.on(eventType, firstGreet);
    secondGreet = function(greeting) {
      return `New Greeting: ${greeting}`;
    }
  });

  it('Greeter constructor has EventEmitter properties', function () {
    results = greeter1.listeners(eventType).map((listener) => listener());
    expect(results).toEqual(['Someone greeted!']);
  });

  it('should allow for on events with parameters', function () {
    greeter1.on(eventType, secondGreet);
    results = greeter1.listeners(eventType)[1]('FooBar');
    expect(results).toBe('New Greeting: FooBar');
  });
});