/* npm t exercises/promises/list_files_async_test.mjs
Instructions:
– Implement list_files_async.mjs via Promises
– It should be an async version of: list_files_sync.mjs
– Use util.promisify() to convert fs.stat() and fs.readdir() to Promise-based functions
*/
suite('list_files_async_test.mjs');

import * as assert from 'assert/strict';
import * as path from 'path';
import {fileURLToPath} from 'url';

import {listFilesSync} from './list_files_sync.mjs';
import {listFilesAsync} from './list_files_async.mjs';

const TEST_DIR = fileURLToPath(new URL('list_files_async_test_dir', import.meta.url));

const TEST_DIR_FILES = [
  path.resolve(TEST_DIR, 'bar.txt'),
  path.resolve(TEST_DIR, 'foo.txt'),
  path.resolve(TEST_DIR, 'subdir', 'baz.txt'),
];

test('sync', () => {
  const files = listFilesSync(TEST_DIR);
  assert.deepEqual(files, TEST_DIR_FILES);
});
test('async', () => {
  return listFilesAsync(TEST_DIR)
  .then(files => {
    assert.deepEqual(files, TEST_DIR_FILES);
  });
});
