/* npm t exercises/variables-assignment/const_exrc.mjs
Instructions:
- Run this test (it fails).
- Insert a single(!) const statement so that the test passes.
*/
suite('const_exrc.mjs');

import * as assert from 'assert/strict';

test('const', () => {
  const x = 3;
  assert.equal(x, 3);
  {
    const x = 12;
    assert.equal(x, 12);
  }
  assert.equal(x, 3);
});