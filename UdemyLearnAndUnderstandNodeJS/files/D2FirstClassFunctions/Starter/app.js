// Your Javascript Code Goes Here
function greet() {
  return 'Hi!';
}
function logGreeting(fn) {
  return fn();
}
let greetMe = function() {
  return 'Hi Tony!'
}

export { greet, logGreeting, greetMe };