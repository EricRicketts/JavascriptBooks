/* npm t exercises/regexps/extract_quoted_test.mjs
Instructions:
- Implement extract_quoted.mjs
– Use RegExp.prototype.exec()
*/
suite('extract_quoted_test.mjs');

import * as assert from 'assert/strict';

import {extractQuoted} from './extract_quoted.mjs';

test('extractQuoted()', () => {
  assert.deepEqual(extractQuoted('"foo" and "bar" and "baz"'), ['foo', 'bar', 'baz']);
  assert.deepEqual(extractQuoted('nothing is quoted'), []);
  assert.deepEqual(extractQuoted(''), []);
  assert.deepEqual(extractQuoted('empty: ""'), ['']);
});
