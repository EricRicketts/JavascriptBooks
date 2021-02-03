import * as path from 'path';
import * as fs from 'fs';
import { JSDOM } from 'jsdom';

describe('getComputedStyle Method', function () {
  let window, document, first, second, results, expected;
  beforeEach(() => {
    let codeDirectory = path.join(__dirname, '..', 'code'); 
    let htmlFile = fs.readFileSync(codeDirectory + '/get_computed_style.html', 'utf8');
    window = new JSDOM(htmlFile).window;
    document = window.document;
    first = document.getElementById('first');
    second = document.getElementById('second');
  });

  it('adheres to the cascade', function () {
    expected = ['red', 'green'];
    results = [
      window.getComputedStyle(first).backgroundColor,
      window.getComputedStyle(second).backgroundColor
    ];
    expect(results).toEqual(expected);
  });
});