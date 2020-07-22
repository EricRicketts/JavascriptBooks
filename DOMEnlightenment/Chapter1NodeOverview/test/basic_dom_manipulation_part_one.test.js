import * as fs from 'fs';
import * as path from 'path';
let jsdom = require('jsdom');
const { JSDOM } = jsdom;

describe('Basic DOM Manipulation Part One', function () {
  let codeDirectory, emptyHTML, window, document, expected, results;
  describe('Create Element and Text Nodes With Javascript', function () {
    beforeEach(() => {
      codeDirectory = path.join(__dirname, '..', 'code');
      emptyHTML = fs.readFileSync(codeDirectory + '/empty.html', 'utf8');
      window = new JSDOM(emptyHTML).window;
      document = window.document;
    });

    it('Use createElement to create an isolated HTML Element with Javascript', function () {
      let elementNode = document.createElement('div');
      expected = ['DIV', 1];
      results = [elementNode.nodeName, elementNode.nodeType];
      expect(results).toEqual(expected);
    });

    it('Use createTextNode to create a Text Node with Javascript', function () {
      let textNode = document.createTextNode('Hi');
      expected = ['#text', 3];
      results = [textNode.nodeName, textNode.nodeType];
      expect(results).toEqual(expected);
    });

    it('Use createComment to create a Comment Node with Javascript', function () {
      let commentNode = document.createComment('This is a comment');
      expected = ['#comment', 8];
      results = [commentNode.nodeName, commentNode.nodeType];
      expect(results).toEqual(expected);
    });

    it('use setAttribute to set an attribute onto an Element Node', function () {
      let elementNode = document.createElement('div');
      elementNode.setAttribute('class', 'Foo');
      let allAttributes = elementNode.attributes;
      expected = [1, 'class', 'Foo'];
      results = [allAttributes.length, allAttributes[0].name, allAttributes[0].value];
      expect(results).toEqual(expected);
    });
  }); 
});
