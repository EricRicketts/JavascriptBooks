/* npm t exercises/promises/my_promisify_test.mjs
Instructions:
– Implement my_promisify.mjs
– In lines A and B, you can see how Node’s callbacks work
*/
suite('my_promisify_test.mjs');

import * as assert from 'assert/strict';

import {myPromisify} from './my_promisify.mjs';

test('Fulfillment', (done) => {
  const f = (arg, callback) => {
    callback(null, 'success '+arg); // (A)
  };
  const pf = myPromisify(f);
  pf('good').then(x => {
    assert.equal(x, 'success good');
    done();
  });
});

test('Rejection', (done) => {
  const f = (arg, callback) => {
    callback('failure '+arg); // (B)
  };
  const pf = myPromisify(f);
  pf('bad').catch(err => {
    assert.equal(err, 'failure bad');
    done();
  });
});
