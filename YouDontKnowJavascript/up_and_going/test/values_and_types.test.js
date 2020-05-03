describe('You Dont\'t Know Javascript: Up and Going: Values And Types', function () {
  describe('Primitive Values', function () {
    let numberVal, stringVal, booleanVal, undefinedVal, nullVal, symbolVal, bigIntVal, objectVal, functionVal;
    beforeEach(() => {
      numberVal = 43;
      stringVal = 'foo';
      booleanVal = true;
      undefinedVal = undefined;
      nullVal = null;
      symbolVal = Symbol('id');
      bigIntVal = 234n;
      objectVal = { a: 1, b: 2 };
      functionVal = function() { return 'foo'; }
    });

    it('should identify a number', function () {
      expect(typeof(numberVal)).toBe('number');
    });

    it('should identify a string', function () {
      expect(typeof(stringVal)).toBe('string');
    });

    it('should identify a boolean', function () {
      expect(typeof(booleanVal)).toBe('boolean');
    });

    it('should identify undefined', function () {
      expect(typeof(undefinedVal)).toBe('undefined');
    });

    it('should identify null', function () {
      expect(typeof(nullVal)).toBe('object');
      expect(nullVal === null).toBe(true);
    });

    it('should identify a symbol', function () {
      expect(typeof(symbolVal)).toBe('symbol');
    });

    it('should identify a bigInt', function () {
      expect(typeof(bigIntVal)).toBe('bigint');
    });

    it('should identify an object', function () {
      expect(typeof(objectVal)).toBe('object');
    });

    it('should identify a function', function () {
      expect(typeof(functionVal)).toBe('function');
    });
  });
  describe('Object Basics', function () {
    let obj;
    beforeEach(() => {
      obj = {
        a: 'hello world',
        b: 42,
        c: true
      }
    });

    it('should access object through dot notation', function () {
      expect(obj.a).toBe('hello world');
    });

    it('should access object through bracket notation', function () {
      let foo = "b";
      expect(obj[foo]).toBe(42);
    });

    it('should allow adding a property at any time', function () {
      obj.d = { a: 1 };
      expect(obj).toEqual( { a: 'hello world', b: 42, c: true, d: { a: 1 } });
    });

    it('should allow changing a property at any time', function () {
      obj.c = false;
      expect(obj).toEqual({ a: 'hello world', b: 42, c: false });
    });
  });

  describe('Array Basics', function () {
    let arr;
    beforeEach(() => {
      arr = [
        'hello world',
        42,
        true
      ];
    });

    it('should allow for changing values at any time', function () {
      arr[0] = 'foo';
      expect(arr).toEqual(['foo', 42, true]);
    });

    it('should allow for adding an element and removing an element', function () {
      arr.push('bar');
      arr.shift();
      expect(arr).toEqual([42, true, 'bar']);
    });
  });

  describe('Function Basics', function () {
    let foo;
    beforeEach(() => {
      foo = function() {
        return 'foo';
      }
    });

    it('should be a function reference', function () {
      expect(typeof foo).toBe('function');
    });

    it('should return a value when called', function () {
      expect(foo()).toBe('foo');
    });

    it('should add properties to functions because they are objects', function () {
      foo.bar = 'bar';
      expect(foo.bar).toBe('bar');
    });

    it('Javascript has immediately invoked function expressions, IIFE', function () {
      let x = (function() { return 42; })();
      expect(x).toBe(42);
    });
  });

  describe('Comparing Values Basics', function () {
    let a, b;
    it('should explicitly coerce', function () {
      a = 42;
      b = '42';
      expect(a === Number(b)).toBe(true);
    });

    it('should implicitly coerce', function () {
      a = 42;
      b = '42';
      expect(a == b).toBe(true);
    });

    it('list falsy values', function () {
      let values = [!!0, !!-0, !!NaN, !!'', !!undefined, !!null];
      expect(values).toEqual([false, false, false, false, false, false]);
    });
  });
});