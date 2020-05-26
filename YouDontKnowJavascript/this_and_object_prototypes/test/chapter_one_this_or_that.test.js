describe('You Don\'t Know Javascript this and Object Prototypes', function () {
  describe('Chapter One: this or that?', function () {
    let firstFoo, secondFoo;
    beforeEach(() => {
      firstFoo = function() {
        let str = `firstFoo: ${firstFoo.count}`;
        firstFoo.count += 1;
        return str;
      }
      firstFoo.count = 0;
      secondFoo = function() {
        let str = `secondFoo: ${this.count}`;
        this.count += 1;
        return str;
      }
      secondFoo.count = 0;
    });
    it('should advance firstFoo count', function () {
      expect(firstFoo()).toBe('firstFoo: 0');
      expect(firstFoo.count).toBe(1);
    });

    it('should advance secondFoo count', function () {
      expect(secondFoo.call(secondFoo)).toBe('secondFoo: 0');
      expect(secondFoo.count).toBe(1);
    });
  }); 
});