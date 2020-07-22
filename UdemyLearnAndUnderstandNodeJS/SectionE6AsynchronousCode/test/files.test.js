let fs = require('fs');
let fsPromises = fs.promises;
import * as path from 'path';
import '@babel/polyfill';

describe('Section E6 Lesson F8 Files', function () {
  let fileContents, fileDirectory, fileLines, fetchFile, fileData;
  beforeEach(() => {
    fileContents = fs.readFileSync(__dirname + '/../files/greet.txt', 'utf-8');
    fileLines = fileContents.split('\n');
    fileDirectory = path.join(__dirname, '..', 'files')
    fetchFile = function() {
      return fsPromises.readFile(fileDirectory + '/greet.txt', 'utf8')
        .then((data) => data)
        .catch((e) => e.message)
    }
  });

  it('should retrieve the file contents', function () {
    expect(typeof fileContents).toBe('string');
  });

  it('file contents includes line returns', function () {
    expect(fileLines.length).toBe(3);
  });

  it('with no encoding readFile returns a buffer', async () => {
    let expected = 'This is a text file.\nThis is the second line of the file.\nThis is the final line of the file.'
    await expect(fetchFile()).resolves.toBe(expected);
  });
});