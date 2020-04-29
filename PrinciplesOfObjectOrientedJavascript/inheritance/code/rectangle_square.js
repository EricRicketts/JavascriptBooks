function Rectangle(length, width) {
  this.length = length;
  this.width = width;
}
Rectangle.prototype.area = function() {
  return this.length * this.width;
}

Rectangle.prototype.toString = function() {
  let figureName = Object.getPrototypeOf(this).constructor.name;
  return "[" + figureName + ' ' + this.length + "x" + this.width + " ]";
}

function Square(size) {
  this.length = size;
  this.width = size;
}

Square.prototype = new Rectangle();
Square.prototype.constructor = Square;

function AnotherSquare(size) {
  this.length = size;
  this.width = size;
}

AnotherSquare.prototype = Rectangle.prototype;
AnotherSquare.prototype.constructor = AnotherSquare;

function YetAnotherSquare(size) {
  Rectangle.call(this, size, size)
}

YetAnotherSquare.prototype = Object.create(Rectangle.prototype, {
  constructor: {
    configurable: true,
    enumerable: true,
    value: YetAnotherSquare,
    writable: true
  },
  foo: {
    configurable: true,
    enumerable: true,
    value: 'bar',
    writable: true
  }
});

export { Square, AnotherSquare, YetAnotherSquare, Rectangle };