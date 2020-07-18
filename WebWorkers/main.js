const first = document.querySelector('#number1');
const second = document.querySelector('#number2');

const result = document.querySelector('.result');
if (window.Worker) {
  const myWorker = new Worker("worker.js");

  first.onchange = function() {
    myWorker.postMessage([first.value, second.value]);
    console.log('Message posted to web worker, due to event on first.');
  }

  second.onchange = function() {
    myWorker.postMessage([first.value, second.value]);
    console.log('Message posted to web worker, due to even on second.');
  }

  myWorker.onmessage = function(e) {
    result.textContent = e.data;
    console.log('In main, message received from worker.');
  }
} else {
  console.log('Your browser does not support web workers.');
}