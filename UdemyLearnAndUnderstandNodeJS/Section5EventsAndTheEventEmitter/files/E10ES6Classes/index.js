import { EventEmitter } from 'events';

class Person extends EventEmitter {
  constructor(firstName, lastName) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
  }

  greet() {
    return `Hello, ${this.firstName} ${this.lastName}!`;
  }
}

export { Person };