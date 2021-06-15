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

test('Read file via a Promise', () => {
    return readFilePromisified(testFilePath, { encoding: 'utf8' })
    .then((text) => {
      text = text.trim();
      assert.equal(text, 'The test data');
    });
});
