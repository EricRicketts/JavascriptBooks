import { EventEmitter } from 'events';

let Person = Object.create(EventEmitter.prototype);
Person.greet = function() {
  return `Hello, ${this.firstName} ${this.lastName}!`;
}

export { Person };
