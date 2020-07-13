import { EventEmitter } from 'events';

function Person(firstName, lastName) {
  EventEmitter.call(this);
  this.firstName = firstName;
  this.lastName = lastName;
}
Person.prototype = Object.create(EventEmitter.prototype, {
  constructor: {
    value: Person,
    enumerable: true,
    configurable: true,
    writable: true
  }
});

Person.prototype.greet = function() {
  return `Hello, ${this.firstName} ${this.lastName}!`;
}


export { Person }

