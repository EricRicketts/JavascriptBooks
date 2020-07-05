let greetings = require('./greetings.json');

function greet() {
  return greetings.en;
}

module.exports = greet;