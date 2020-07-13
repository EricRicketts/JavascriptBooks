import { EventEmitter } from 'events';

function Person(firstName, lastName) {
  EventEmitter.call(this);
  this.firstName = firstName;
  this.lastName = lastName;
}

Person.prototype.greet = function() {
  return `Hello, ${this.firstName} ${this.lastName}!`;
}


export { Person }

