/* npm t exercises/async-iteration/number_lines_test.mjs
Instructions:
– Implement number_lines.mjs
– Use an async generator to do so.
*/
suite('number_lines_test.mjs');

import * as assert from 'assert/strict';
import { numberLines } from './number_lines.mjs';

test('numberLines', async () => {
  const asyncIterable = numberLines(generateLines());
  assert.deepEqual(
    await asyncIterableToArray(asyncIterable),
    [
      '1: first',
      '2: second',
    ]);
});

async function asyncIterableToArray(asyncIterable) {
  let result = [];
  for await (const value of asyncIterable) {
    result.push(value);
  }
  return result;
}
async function* generateLines() {
  yield 'first';
  yield 'second';
}
