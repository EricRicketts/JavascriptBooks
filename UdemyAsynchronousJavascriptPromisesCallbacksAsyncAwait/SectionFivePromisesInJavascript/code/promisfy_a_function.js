function capitalize(text) {
  return new Promise(function(resolve, reject) {
    if (typeof text !== 'string') {
      return reject(new TypeError('Argument type must be a string.'));
    }
    let result = text[0].toUpperCase() + text.substring(1);
    return resolve(result);
  });
}

let capsFor = function(val) {
  return capitalize(val).then(value => {
    console.log(`Success: ${value}`);
  }, reason => {
    console.log(`Error: ${reason}`);
  });
}

let arr = ['fooBar', 55];
arr.forEach(val => capsFor(val));