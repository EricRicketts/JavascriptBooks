let obj = {
  greet: 'foo'
}

let arr = [];

arr.push(() => 'foo 0');
arr.push(() => 'foo 1');
arr.push(() => 'foo 2');

module.exports = {
  obj: obj,
  arr: arr
};
