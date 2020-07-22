import * as fs from 'fs';
import { asyncData } from "../files/read_file_async";

describe('Section E6 Lesson F8 Files', function () {
  let fileContents, fileLines;
  beforeEach(() => {
    fileContents = fs.readFileSync(__dirname + '/../files/greet.txt', 'utf-8');
    fileLines = fileContents.split('\n');
  });

  it('should retrieve the file contents', function () {
    expect(typeof fileContents).toBe('string');
  });

  it('file contents includes line returns', function () {
    expect(fileLines.length).toBe(3);
  });

  it('with no encoding readFile returns a buffer', function () {
    expect(typeof asyncData).toBe('object');
  });
});