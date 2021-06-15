/* npm t exercises/modules/export_named_test.mjs
Instructions:
– Create export_named.mjs so that this test passes
*/
suite('export_named_test.mjs');

import * as assert from 'assert/strict';

import {func} from './export_named.mjs';

test('export_named', () => {
  assert.equal(func(), 'hello');
});
