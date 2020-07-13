import { EventEmitter } from 'events';
import { inherits } from 'util';

let eventType = 'greet';
let firstGreet = function() {
  return 'Someone greeted!';
}

function Greeter() {
  this.greeting = 'Hello World!';
}

inherits(Greeter, EventEmitter);

Greeter.prototype.greet = function() {
  return this.greeting;
}

export { eventType, firstGreet, Greeter };