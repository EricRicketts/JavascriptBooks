function AnotherPerson(lastName, firstName, age, gender) {
  this.lastName = lastName;
  this.firstName = firstName;
  this.age = age;
  this.gender = gender;
}
AnotherPerson.prototype = {
  constructor: AnotherPerson,
  fullName: function() {
    return this.firstName + ' ' + this.lastName;
  },
  greet: function() {
    return "Hello, my name is " + this.fullName();
  }
}

function Caucasian(lastName, firstName, age, gender) {
  AnotherPerson.call(this, lastName, firstName, age, gender);
  this.race = 'caucasian';
}

function Asian(lastName, firstName, age, gender) {
  AnotherPerson.call(this, lastName, firstName, age, gender);
  this.race = 'asian';
}

export { AnotherPerson, Caucasian, Asian };