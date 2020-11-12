let myPromise = new Promise(function(resolve, reject) {
  resolve('Hello, World!');
});

myPromise.then(function(value) {
  console.log('I am in the then function');
  console.log(`promise fulfilled value is ${value}`);
});

console.log('this statement is placed after all of the promise code, but it should execute first.');