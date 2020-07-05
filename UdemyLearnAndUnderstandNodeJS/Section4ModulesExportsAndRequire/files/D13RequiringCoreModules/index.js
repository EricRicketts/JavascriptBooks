let util = require('util');
let name = 'Eric';
let greeting = util.format('Hello, %s!', name);

module.exports = {
  greeting: greeting
}