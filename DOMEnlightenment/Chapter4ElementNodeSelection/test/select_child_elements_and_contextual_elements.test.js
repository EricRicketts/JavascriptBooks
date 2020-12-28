import * as fs from 'fs';
import * as path from 'path';
import { JSDOM } from 'jsdom';

describe('DOMEnlightenment Chapter Four Element Node Selection', function () {
  let window, document, expected, results;
  beforeEach(() => {
    let fileName = '/select_child_elements_and_contextual_elements.html';
    let codeDirectory = path.join(__dirname, '..', 'code');
    let htmlFile = fs.readFileSync(codeDirectory + fileName, 'utf8');
    window = new JSDOM(htmlFile).window;
    document = window.document;
  });
  describe('Immediate Child Elements', function () {
    it('should return an array like object of only element children', function () {
      let firstUL = document.querySelector('ul');
      expected = [2, 'LI', 'LI'];
      results = [firstUL.children.length];
      Array.from(firstUL.children).forEach(element => {
        results.push(element.nodeName);
      });

      expect(results).toEqual(expected);
    });

    it('should return an empty array like object if there are no children', function () {
      let secondUL = document.querySelector('ul:nth-of-type(2)');
      expected = [0, 'HTMLCollection', []];
      results = [
        secondUL.children.length, secondUL.children.constructor.name,
        Array.from(secondUL.children)
      ];

      expect(results).toEqual(expected);
    });
  });
});
