/* npm t exercises/sync-generators/iter_nested_arrays_test.mjs
Instructions:
- Implement iter_nested_arrays.mjs
*/
suite('iter_nested_arrays_test.mjs');

import * as assert from 'assert/strict';

import {iterNestedArrays} from './iter_nested_arrays.mjs';

test('iterNestedArrays()', () => {
  assert.deepEqual([ ...iterNestedArrays([]) ], []);
  assert.deepEqual([ ...iterNestedArrays(['a']) ], ['a']);
  assert.deepEqual([ ...iterNestedArrays([[['a']]]) ], ['a']);
  assert.deepEqual([ ...iterNestedArrays(['a', ['b', 'c'], 'd']) ], ['a', 'b', 'c', 'd']);
  assert.deepEqual([ ...iterNestedArrays(['a', ['b', ['c']], 'd']) ], ['a', 'b', 'c', 'd']);
});
