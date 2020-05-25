describe('You Don\'t Know Javascript Scopes and Closures', function () {
  describe('Blocks as Scopes', function () {
    it('let scopes to a block', function () {
       let foo = true;
       if (foo) {
         let bar = false;
       }
       expect(() => { bar; }).toThrow(ReferenceError);
    });

    it('var is scoped globally or to the entire function', function () {
       var foo = true;
       if (foo) {
         var bar = false;
       }
       expect(bar).toBe(false);
    });

    it('constants are block scoped', function () {
      if(true) {
        const foo = 1;
      }
      expect(() => { foo; }).toThrow(ReferenceError);
    });
  });
});