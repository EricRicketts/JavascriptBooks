/* npm t exercises/async-iteration/async_iterable_to_array_test.mjs
Instructions:
* Implement async_iterable_to_array.mjs
* asyncIterableToArray() is an async function
*/
suite('async_iterable_to_array_test.mjs');

import * as assert from 'assert/strict';
import { asyncIterableToArray } from './async_iterable_to_array.mjs';

test('asyncIterableToArray', async () => {
  assert.deepEqual(
    await asyncIterableToArray(yieldArray([])),
    []
  );
  assert.deepEqual(
    await asyncIterableToArray(yieldArray(['a', 'b'])),
    ['a', 'b']
  );
  assert.deepEqual(
    await asyncIterableToArray(yieldArray(['a', 'b', 'c'])),
    ['a', 'b', 'c']
  );
});

/** Async generator, returns an async iterable */
async function* yieldArray(arr) {
  yield* arr;
}
