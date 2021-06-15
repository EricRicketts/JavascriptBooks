/* npm t exercises/async-js/read_file_cb_exrc.mjs
Instructions:
- The first test is synchronous, implement the second test via the callback-based readFile()
- For the test to work asynchronously, you need to call done() at the end
*/
suite('read_file_cb_exrc.mjs');

import * as assert from 'assert/strict';
import {fileURLToPath} from 'url';

const testFilePath = fileURLToPath(new URL('read_file_cb_exrc_data.txt', import.meta.url));

import {readFileSync} from 'fs';

test('Read file synchronously', () => {
  const text = readFileSync(testFilePath, { encoding: 'utf8' }).trim();
  assert.equal(text, 'The test data');
});

import {readFile} from 'fs';

test('Read file via callback', (done) => { // call done() once you are finished
  // EXERCISE: Implement this test
});
