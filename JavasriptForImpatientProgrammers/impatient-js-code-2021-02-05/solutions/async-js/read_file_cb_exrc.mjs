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
  readFile(testFilePath, { encoding: 'utf8' },
    function (err, text) {
      if (err) {
        console.error(err);
        t.end(err);
        return;
      }
      text = text.trim();
      assert.equal(text, 'The test data');
      done();
    });
});
