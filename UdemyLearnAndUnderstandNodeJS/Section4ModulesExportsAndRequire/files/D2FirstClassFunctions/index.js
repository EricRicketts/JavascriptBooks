function greet() {
  return 'Hi!';
}

function logGreeting(fn) {
  return fn();
}

let greetMe = function() {
  return 'Hi, Eric!';
}

let greetNow = (function() {
  return 'Hi, Wendy!'
})();

module.exports = {
  greet: greet,
  greetMe: logGreeting(greetMe),
  greetNow: greetNow
}