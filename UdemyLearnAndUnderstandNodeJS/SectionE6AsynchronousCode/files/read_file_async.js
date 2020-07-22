const fs = require('fs');
let asyncData;

function callback(error, data) {
  if (error !== null) {
    return error.message;
  } else {
    asyncData = data;
    console.log(asyncData);
  }
}

fs.readFile(__dirname + '/greet.txt', callback);
console.log(asyncData);
