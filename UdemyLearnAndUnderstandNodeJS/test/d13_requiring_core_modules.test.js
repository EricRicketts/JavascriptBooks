let greeting = require('../files/D13RequiringCoreModules');

describe('D13 Requiring Core Modules', function () {
  it('We can require core modules from NodeJS', function () {
    expect(greeting.greeting).toBe('Hello, Eric!');
  });
});