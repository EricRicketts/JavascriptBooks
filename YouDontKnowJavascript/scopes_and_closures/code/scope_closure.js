let fn;

function foo() {
  let a = 2;

  function  bar() {
    return a;
  }

  return bar;
}

function secondFoo() {
  let a = 2;
  
  function baz() {
    return a;
  }

  return bar(baz);
}

function bar(fn) {
  return fn;
}

function thirdFoo() {
  let a = 2;

  function baz() {
    return a;
  }

  fn = baz;
}

function secondBar() {
  return fn;
}

function coolModule() {
  let something = 'cool';
  let another = [1, 2, 3];

  function doSomething() {
    return something;
  }  
  
  function doAnother() {
    return another;
  }

  return {
    doSomething: doSomething,
    doAnother: doAnother
  }
}

let publicAPI = (function coolModule(id) {
  let publicAPI = {
    change: change,
    identify: identify1
  }

  function change() {
    // modify the public API
    publicAPI.identify = identify2
  }

  function identify1() {
    return id;
  }

  function identify2() {
    return id.toUpperCase();
  }

  return publicAPI;
})('foo module');

let MyModules = (function Manager() {
  let modules = {};
  let x = {};

  function define(name, deps, impl) {
    for (let i=0; i<deps.length; i++) {
      deps[i] = modules[deps[i]];
    }
    x[name] = impl.apply(impl, deps);
    modules[name] = impl.apply( impl, deps );
  }

  function get(name) {
    return modules[name];
  }

  return {
    define: define,
    get: get
  };
})();

  export { foo, secondFoo, thirdFoo, secondBar, coolModule, publicAPI, MyModules };

/*
in the test we do the following:
let baz = foo(); this assigns the function bar to the variable baz
baz(); then we call baz which calls bar and the return value is 2
because at the time of its assignment to baz, bar has already established
a closure of the inner scope of function foo, thus is has access to variable
a even when invoked outside of its declared lexical scope.

bar will always have a reference to the inner scope of foo and we call this
reference a closure.  A closure lets a function continue to access the
lexical scope it was defined in at author time.
 */