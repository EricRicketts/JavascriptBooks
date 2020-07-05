function Greeter() {
  this.greeting = 'greet3: Hello World!';
  this.greet = function() {
    return this.greeting;
  }
}

module.exports = new Greeter();