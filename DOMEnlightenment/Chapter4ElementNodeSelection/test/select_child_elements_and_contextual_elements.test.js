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

  describe('Most Common List Of Element Nodes', function () {
    it('querySelectorAll, getElementsByTagName, getElementsByClassName', function () {
      let liListOne = document.querySelectorAll('li');
      let liListTwo = document.getElementsByTagName('li');
      let liListThree = document.getElementsByClassName('liClass');
      let sameList = (liListOne.length === liListTwo.length && liListOne.length === liListThree.length);

      expect(sameList).toBe(true);
    });
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
  
  describe('Select Contextual Elements', function () {
    let div;
    beforeEach(() => {
      div = document.querySelector('div');
    });

    it('querySelector and querySelectorAll can be called on elements', function () {
      let firstUL = div.querySelector('ul');
      let secondUL = div.querySelectorAll('ul');

      expect(firstUL === secondUL[0]).toBe(true);
    });

    it('getElementsByTagName and getElementsByClassName can be called on elements', function () {
      let firstLiList = div.getElementsByTagName('li');
      let secondLiList = div.getElementsByClassName('liClass');

      expect(firstLiList.length === secondLiList.length).toBe(true);
    });
  });

  describe('Use Matches To Verify Equality', function () {
    it('should use matches to verify the element is what you are looking for', function () {
      let match = document.querySelector('ul:nth-of-type(2)').matches('#second');
      expect(match).toBe(true);
    });
  });
});
