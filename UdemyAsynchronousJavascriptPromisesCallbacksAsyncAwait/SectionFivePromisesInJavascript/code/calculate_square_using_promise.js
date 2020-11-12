function calculateSquare(number) {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof number !== 'number') {
        return reject(new TypeError('Argument of type Number is expected.'));
      }
        return resolve(number * number);
    }, 1000);
  });
  return promise;
}

[5, 'foo'].forEach(val => {
  calculateSquare(val).then(value => {
    console.log(`Success: ${value}`);
  }, reason => {
    console.log(`Error: ${reason}`);
  });
});