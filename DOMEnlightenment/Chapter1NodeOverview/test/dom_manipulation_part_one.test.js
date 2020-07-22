import * as fs from 'fs';
import * as path from 'path';
let jsdom = require('jsdom');
const { JSDOM } = jsdom;

describe('Basic DOM Manipulation Part One', function () {
  let codeDirectory, emptyHTML, window, document, expected, results;
  beforeEach(() => {
    codeDirectory = path.join(__dirname, '..', 'code');
  });
  describe('Create Element and Text Nodes With Javascript', function () {
    beforeEach(() => {
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

  describe('Wholesale Replacement of Descendents or Their Text and Adjacent Insertions', function () {
    let html;
    beforeEach(() => {
      html = fs.readFileSync(codeDirectory + '/manipulation_part_one.html', 'utf8');
      window = new JSDOM(html).window;
      document = window.document;
    });

    it('innerHTML can be used to replace or insert new element content', function () {
      document.getElementById('A').innerHTML = '<strong>Hi</strong>';
      expected = '<div id="A"><strong>Hi</strong></div>';
      expect(document.getElementById('A').outerHTML).toBe(expected);
    });

    it('outerHTML can be used to replace an entire element and all of its content', function () {
      let newHTML = '<div id="B" class="new">Whats Shaking</div>';
      document.getElementById("B").outerHTML = newHTML;
      let parentElement = document.createElement('div');
      let newDiv = document.getElementById('B');
      parentElement.appendChild(newDiv);
      expect(parentElement.innerHTML).toBe(newHTML);
    });

    it('change textContent of an element', function () {
      document.getElementById('C').textContent = 'dude';
      expect(document.getElementById('C').firstChild.nodeValue).toBe('dude');
    });

    it('insertAdjacentHTML allows precise positioning of new HTML', function () {
      let element = document.getElementById('elm');
      element.insertAdjacentHTML('beforebegin', '<span>Hey-</span>');
      element.insertAdjacentHTML('afterbegin', '<span>dude-</span>');
      element.insertAdjacentHTML('beforeend', '<span>-are</span>');
      element.insertAdjacentHTML('afterend', '<span>-you?</span>');
      expected = '<span>Hey-</span><i id="elm"><span>dude-</span>how<span>-are</span></i><span>-you?</span>';
      let previous = element.previousSibling;
      let next = element.nextSibling;
      results = previous.outerHTML + element.outerHTML + next.outerHTML;
      expect(results).toBe(expected);
    });

    it('innerHTML as a getter returns a string', function () {
      let element = document.getElementById('F');
      expected = ['<i>Hi</i>', '<div id="F"><i>Hi</i></div>'];
      results = [element.innerHTML, element.outerHTML];
      expect(results).toEqual(expected);
    });

    it('textContent returns concatenation element text plus all child text', function () {
      expect(document.getElementById('G').textContent).toBe('Dude !');
    });
  });
});
