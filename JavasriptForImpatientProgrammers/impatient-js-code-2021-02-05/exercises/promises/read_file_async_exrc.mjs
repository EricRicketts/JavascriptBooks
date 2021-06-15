/* npm t exercises/promises/read_file_async_exrc.mjs
Instructions:
- The first test is synchronous, implement the second test via the Promise-based readFilePromisified()
- For the test to work asynchronously, you need to return a Promise (chain)
*/
suite('read_file_async_exrc.mjs');

import * as assert from 'assert/strict';
import {fileURLToPath} from 'url';

const testFilePath = fileURLToPath(new URL('read_file_async_exrc_data.txt', import.meta.url));

import {readFileSync} from 'fs';

test('Read file synchronously', () => {
  const text = readFileSync(testFilePath, { encoding: 'utf8' }).trim();
  assert.equal(text, 'The test data');
});

import {readFile} from 'fs';
import {promisify} from 'util';
const readFilePromisified = promisify(readFile);

test('Read file via Promise', () => {
  // EXERCISE: Implement this test
});
