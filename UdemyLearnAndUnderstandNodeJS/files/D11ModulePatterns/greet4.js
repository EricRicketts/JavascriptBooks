function Greeter() {
  this.greeting = 'greet4: Hello World!';
  this.greet = function() {
    return this.greeting;
  }
}

module.exports = Greeter;