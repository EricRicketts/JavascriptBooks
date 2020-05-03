function foo(a) {
  var b = a*2;

  function bar(c) {
    return [a, b, c];
  }

  return bar(b*3)
}

export { foo };