onmessage = function(e) {
  console.log('In worker, message received from main script.');
  let workerResult = `Result: ${e.data[0] * e.data[1]}`;
  console.log('In worker, posting Message back to main script.');
  postMessage(workerResult);
}