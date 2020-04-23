function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayName = function() {
    return 'Hello, my name is ' + this.name + '.';
  }
}

export { Person };