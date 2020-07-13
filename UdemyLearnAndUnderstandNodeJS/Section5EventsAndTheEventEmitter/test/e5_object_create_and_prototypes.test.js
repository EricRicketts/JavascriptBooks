import { person } from '../files/E5ObjectCreateAndPrototypes/index';

describe('Object Create and Prototypes', function () {
  let john, jane;
  beforeEach(() => {
    john = Object.create(person);
    jane = Object.create(person);
  });

  it('should allow for unique objects with common behavior', function () {
    [john.firstName, john.lastName] = ['John', 'Doe'];
    [jane.firstName, jane.lastName] = ['Jane', 'Doe'];

    expect([jane.greet(), john.greet()]).toEqual(['Jane Doe', 'John Doe']);
  });
});