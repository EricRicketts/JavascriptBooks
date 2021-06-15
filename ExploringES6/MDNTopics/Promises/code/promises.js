function myJSONPlaceholderRequest(url) {
  return new Promise(function(fulfilled, rejected) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = function(event) { fulfilled(event.target.response ) };
    xhr.onerror = function(event) { rejected(event.target.statusText ) };
  });
}

function singlePromise(select) {
  let arr = [];
  return new Promise(function(fulfilled, rejected) {
    if (select) {
      arr.push(0);
      fulfilled(arr);
    } else {
      rejected(new Error('The operation failed to complete.'));
    }
  })
}
function chainedPromises(select) {
  let arr = [];
  return new Promise(function(fulfilled, rejected) {
    if (select) {
      arr.push(0)
      fulfilled(arr);
    } else {
      rejected(new Error('I have generated an error for this operation.'))
    }
  }).then(function(ary) {
    ary.push(1);
    return ary;
  }).then(function(ary) {
    ary.push(2);
    return ary;
  }).catch(function(error) {
    return error;
  });
}

export { myJSONPlaceholderRequest,  singlePromise, chainedPromises };