import * as assert from 'assert/strict';

test('conversion', () => {
  assert.equal(Boolean(5), true);
  assert.equal(Number('7'), 7);
  assert.equal(String(21), '21');
});
