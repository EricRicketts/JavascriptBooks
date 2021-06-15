// npm t demos/quizzes-exercises/id_test.mjs
suite('id_test.mjs');

import * as assert from 'assert/strict';
import {id} from './id.mjs';

test('My test', () => {
  assert.equal(id('abc'), 'abc');
});
