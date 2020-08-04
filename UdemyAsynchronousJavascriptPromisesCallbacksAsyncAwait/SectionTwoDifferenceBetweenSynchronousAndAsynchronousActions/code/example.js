function numberFour(ary) {
  const number = 4;
  ary.push(number);
}

function numberOne(ary) {
  ary.push(1);
}

function numberThreeSync(ary) {
  const n = 3;
  ary.push(n);
}

function numberTwo(ary) {
  function getNumberTwo() {
    return 2;
  }
  ary.push(getNumberTwo());
}

function synchronous() {
  let ary = [];
  numberOne(ary);
  numberTwo(ary);
  numberThreeSync(ary);
  numberFour(ary);

  return ary;
}

export { numberOne, numberTwo, numberThreeSync, numberFour, synchronous };