let greetings = require('../files/D12ExportsVsModuleExports/index');

describe('D12 Exports Versus Module Dot Exports', function () {
  it('require only returns value of module.exports', function () {
    /*
    By default exports and module.exports point to the same object, however, in greet1 I reassigned
    exports to a new object, actually I assigned exports to a function, now module.exports and exports
    both point to different objects.  However, require only returns whatever module.exports is pointing
    to, so once we reassign exports it is no longer reachable by require.  Thus in the case of greet1 an
    empty object is returned because module.exports defaults to an empty object.
    */
    expect(greetings.greet1).toEqual({});
  });

  it('add property to exports same as adding property to module.exports', function () {
    let expected = 'greet2: add a property to exports same as adding property to module.exports';
    expect(greetings.greet2.greet()).toBe(expected);
  });
});