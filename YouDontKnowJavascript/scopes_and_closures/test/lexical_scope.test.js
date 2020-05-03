import { foo } from "../code/nested_scopes";

describe('You Don\'t Know Javascript: Scopes and Closures: Lexical Scope', function () {
  let anotherFoo, bar, b;
  beforeEach(() => {
    b = 2;
    anotherFoo = function(a) {
      return a + b;
    }

    bar = function(a) {
      let b = 4;
      return a + b;
    }
  });
  it('should return variables from three different scopes', function () {
    expect(foo(2)).toEqual([2, 4, 12]);
  });

  it('inner scope has access to variables in outer scope', function () {
    expect(anotherFoo(3)).toBe(5);
  });

  it('inner scoped variables shadow variables in outer scope', function () {
     expect(bar(2)).toBe(6);
  });
});