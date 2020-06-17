describe('You Don\'t Know Javascript', function () {
  describe('this and Object Prototypes', function () {
    describe('Chapter 5: Prototypes', function () {
      let myObject, anotherObject, Foo, Bar, results, expected;
      describe('[[Prototype]] property on objects', function () {
        beforeEach(() => {
          anotherObject = { a: 1, b: 2 };
          myObject = Object.create(anotherObject, {
            c: {
              writable: true,
              enumerable: true,
              configurable: true,
              value: 3
            }
          });
        });

        it('properties from prototype and not "own" properties', function () {
          results = Object.getOwnPropertyNames(myObject);
          expected = ["c"];
          expect(results).toEqual(expected);
        });

        it('for .. in loop looks at all properties including inherited properties', function () {
          let object = Object.create(myObject);
          object.d = 4;
          results = [];
          for (let prop in object) {
            results.push(prop);
          }
          expected = ["a", "b", "c", "d"];
          expect(results.sort()).toEqual(expected);
        });

        it('in will also check the entire chain', function () {
          expect("a" in myObject).toBe(true);
        });

        it('literal objects have Object.prototype as their [[Prototype]] property', function () {
          expect(Object.getPrototypeOf(anotherObject) === Object.prototype).toBe(true);
        });

        it('The [[Prototype]] Property of Object.prototype is null', function () {
          expect(Object.getPrototypeOf(Object.prototype)).toBeNull();
        });

        it('shadowing occurs when lower level object has the same property', function () {
          myObject.a++;
          results = [myObject.a, anotherObject.a];
          expected = [2, 1];
          expect(results).toEqual(expected);
          /*
           In this case property "a" does not exist on myObject but through the prototype chain, in this case the
           operation is just like myObject.a = myObject.a + 1; so the initial value if the prototype value for "a"
           is used and then a new "own" property of "a" is created for myObject and assigned the value of 2.  However,
           the prototype property remains unchanged.  The bottom line is to avoid shadowing whenever possible.
          */
        });
      });
      describe('PseudoClassical Inheritance', function () {
        let Foo, a, b;
        beforeEach(() => {
          Foo = function () {
            this.message = 'I, message, will be your own property.';
          }
          Foo.prototype.name = 'I am Foo!'
          a = new Foo();
        });

        it('object a should be prototype linked to Foo.prototype', function () {
          expect(Object.getPrototypeOf(a) === Foo.prototype).toBe(true);
        });

        it('Foo.prototype is an object', function () {
          expect(typeof Foo.prototype).toBe('object');
        });

        it('properties set in the constructor become own properties of the object', function () {
          expect(a.hasOwnProperty('message')).toBe(true);
        });

        it('In Javascript one can delegate behavior to the prototype', function () {
          results = [false, 'I am Foo!'];
          expected = [a.hasOwnProperty('name'), a.name];
          expect(results).toEqual(expected);
        });

        it('all function prototype objects have a constructor property', function () {
          expect(Foo.prototype.constructor === Foo).toBe(true);
          // constructor points back to the function itself
        });

        it('the constructor itself can be used to create objects', function () {
          b = new Foo.prototype.constructor();
          expect(b.name).toBe('I am Foo!');
        });

        it('instantiated objects from a constructor call have a constructor property', function () {
          expect(a.constructor).toBe(Foo);
        });

        it('the constructor property can be changed', function () {
          Foo.prototype = { name: 'I am a new prototype Foo!' };
          b = new Foo();
          results = [b.name, b.constructor === Foo, b.constructor === Object];
          expected = ['I am a new prototype Foo!', false, true];
          expect(results).toEqual(expected);
          /*
            this is an important point that Kyle Simpson makes in his third book of You Don't Know Javascript,
            this & Object Prototypes.  Ideally, such as a language like Ruby, the constructor's only purpose is
            to instantiate objects from the class with the behavior and attributes specified by the class.  It's
            purpose cannot be reassigned.  However, as we just saw above, this is not the case with the
            constructor property in Javascript, it is just another property with a default behavior which lends
            itself to mimic class inheritance.
          */
        });
      });
      describe('Pseudo Classical Inheritance done robustly', function () {
        let Foo, Bar, a, b;
        beforeEach(() => {
          Foo = function(name) {
            this.name = name;
          }
          Foo.prototype.myName = function() {
            return this.name;
          }
          Bar = function(name, label) {
            Foo.call(this, name);
            this.label = label;
          }
          Bar.prototype = Object.create(Foo.prototype, {
            constructor: {
              enumerable: false,
              writable: true,
              configurable: true,
              value: Bar
            }
          });
          a = new Foo('foo');
          b = new Bar('bar', 'I am Bar!');
        });

        it('a should be an instance of Foo, b an instance of Bar and Foo', function () {
          results = [a instanceof Foo, b instanceof Bar, b instanceof Foo];
          expected = [true, true, true];
          expect(results).toEqual(expected);
        });
      });
      describe('Objects Linked To Other Objects (OLOO)', function () {
        let foo, bar, a, b;
        beforeEach(() => {
          foo = {
            init: function(name) {
              this.name = name;
              return this;
            },
            myName: function() {
              return this.name;
            }
          }
          bar = Object.create(foo, {
            label: {
              enumerable: true,
              writable: true,
              configurable: true,
              value: ''
            },
            init: {
              enumerable: true,
              writable: true,
              configurable: true,
              value: function(name, label) {
                Object.getPrototypeOf(this).name = name;
                this.label = label;
                return this;
              }
            }
          });
          a = Object.create(foo).init('foo');
          b = Object.create(bar).init('bar', 'I am bar!');
        });

        it('a should be an instance of foo', function () {
          expect(a.myName()).toBe('foo');
        });

        it('b should be an instance of bar', function () {
          expect(b.label).toBe('I am bar!');
          expect(b.myName()).toBe('bar');
        });
      });
    });
  }); 
});