let greet = require('../files/D10MoreOnRequire/index');

describe('More On Require', function () {
  it('imports allowed across different files', function () {
    // greetings.json imported by both english.js and spanish.js which are both imported by index.js
    //  now this test file imports index.js
    let results = [greet.english(), greet.spanish()];
    let expected = ['Hello', 'Hola'];
    expect(results).toEqual(expected);
  });
});