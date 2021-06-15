import * as assert from 'assert/strict';

test('instanceof', () => {
  const arr = ['a', 'b', 'c'];

  const iter = arr[Symbol.iterator]();
  assert.deepEqual(iter.next(), {value: 'a', done: false });
  assert.deepEqual(iter.next(), {value: 'b', done: false });
  assert.deepEqual(iter.next(), {value: 'c', done: false });
  assert.deepEqual(iter.next(), {value: undefined, done: true });
});
