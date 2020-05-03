let asCircle = function() {
  this.area = function() {
    return Math.PI * this.radius * this.radius;
  };
  this.grow = function() {
    this.radius++;
  };
  this.shrink = function() {
    this.radius--;
  };
  return this;
}

function Circle(radius) {
  this.radius = radius;
}

let circleFunctions = {
  area: function() {
    return Math.PI * this.radius * this.radius;
  },
  grow: function() {
    this.radius += 1;
  },
  shrink: function() {
    this.radius -= 1;
  }
}

function mixin(destination, source) {
  for (let k in source) {
    if(source.hasOwnProperty(k)) {
      destination[k] = source[k];
    }
  }
  return destination;
}

function RoundButton(radius, label) {
  this.radius = radius;
  this.label = label;
}

export { asCircle, Circle, circleFunctions, mixin, RoundButton };