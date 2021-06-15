/* npm t exercises/promises/promise_timeout_test.mjs
Instructions:
– Implement promise_timeout.mjs
– Signature: timeout(ms, promise)
– Use internally: setTimeout(ms, callback)
*/
suite('promise_timeout_test.mjs');

import * as assert from 'assert/strict';

import {timeout} from './promise_timeout.mjs';

test('Waiting longer than timeout must cause error', () => {
  return timeout(500, delay(1000))
  .then(() => {
    assert.fail('No error due to timeout!');
  })
  .catch((err) => {
    // As expected, we got an error
    assert.ok(err instanceof Error);
  });
});
test('Must forward Promise results', () => {
  return timeout(0, Promise.resolve(123))
  .then((result) => {
    assert.equal(result, 123);
  })
  .catch(() => {
    assert.fail('Unexpected rejection');
  });
});
test('Must forward Promise rejections', () => {
  return timeout(0, Promise.reject('error'))
  .then((result) => {
    assert.fail('Unexpected resolution');
  })
  .catch(reason => {
    assert.equal(reason, 'error');
  });
});

//----- Helper function

function delay(ms) {
  return new Promise((resolve, _reject) => {
    setTimeout(resolve, ms);
  });
}
