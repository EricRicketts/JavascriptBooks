// my own additions
let expect = require('chai').expect;

describe('let and const basic behavior', () => {
  let results, expected;
  context('let variable behavior', () =>  {
    it('let variables are mutable', () => {
      let i;
      results = [i];
      [0, 1].forEach(int => {
        i = int;
        results.push(i);
      })
      expected = [undefined, 0, 1];
      expect(results).to.deep.equal(expected);
    });
    it('let must be used in for loops', function () {
      const arr = [0, 1, 2];
      const ary = [];
      for (let i = 0; i < 3; i = i + 1) {
        ary.push(i);
      }
      expect(ary).to.deep.equal(arr);
    });
  });

  context('const variable behavior', () => {
    it('const variables are not mutable', () => {
      const i = 0;
      expect(() => i = i + 1).to.throw(TypeError, 'Assignment to constant variable');
    });

    it('const variables bindings are immutable, but not necessarily the value itself', function () {
      const obj = { prop: 0 }
      obj.prop = obj.prop + 1;
      expect(obj.prop).to.equal(1);
      expect(() => obj = {}).to.throw(TypeError);
    });

    it('const can be used in for .. of loops, each iteration has a fresh binding', function () {
      const arr = [0, 1, 2];
      const ary = [];
      for (const elem of arr) { ary.push(elem); }
      expect(ary).to.deep.equal(arr);
    });
  });

  context('scope of let and const', () => {
    it('let and const variable scoped by block', function () {
      let x1 = 0;
      const x = 0;
      expect([x, x1]).to.deep.equal([0, 0]);
      {
        let y1 = 1;
        const y = 1;
        expect([x, x1, y, y1]).to.deep.equal([0, 0, 1, 1]);
        {
          let z1 = 2;
          const z = 2;
          expect([x, x1, y, y1, z, z1]).to.deep.equal([0, 0, 1, 1, 2, 2]);
        }
      }
      expect(x1).to.equal(0);
      expect(() => y).to.throw(ReferenceError, 'y is not defined');
    });
  });
});