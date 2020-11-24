import * as fs from 'fs';
import * as path from 'path';
import { JSDOM } from 'jsdom';

describe('DOM Enlightenment Chapter Three Element Nodes', function () {
  let window, document, results, expected, anchor, allAttributes;
  beforeEach(() => {
    let codeDirectory = path.join(__dirname, '..', 'code');
    let htmlFile = fs.readFileSync(codeDirectory + '/element_nodes.html', 'utf8');
    window = new JSDOM(htmlFile).window;
    document = window.document;
    anchor = document.querySelector('a');
    allAttributes = Array.from(anchor.attributes);
  });

  describe('Noteworthy inherited properties', function () {

    it('All Elements are children of HTMLElement and Node', function () {
      results = [];
      let element = anchor;
      while (element.constructor.name !== 'Object') {
        element = Object.getPrototypeOf(element);
        results.push(element.constructor.name);
      }
      expected = ['HTMLAnchorElement', 'HTMLElement', 'Element', 'Node', 'EventTarget', 'Object'];
      expect(results).toEqual(expected);
    });

    it('createElement allows creation of an element', function () {
      let textArea = document.createElement('textarea');
      document.body.appendChild(textArea);
      textArea = document.querySelector('textarea');
      expect(textArea.previousElementSibling.nodeName).toBe('A');
    });

    it('tagName and nodeName properties are the same', function () {
      results = [anchor.tagName, anchor.nodeName];
      expected = ['A', 'A'];
      expect(results).toEqual(expected);
    });
  });

  describe('Attribute methods', function () {

    it('attributes retrieves all of the attribute objects of the element', function () {
      results = [
        allAttributes.length,
        allAttributes.every(attribute => attribute.constructor.name === 'Attr')
      ];
      expected = [6, true];
      expect(results).toEqual(expected);
    });

    it('For attribute nodes nodeName, nodeValue give the attribute name and value ', function () {
      results = [allAttributes[2].nodeName, allAttributes[2].nodeValue];
      expected = ['data-foo', 'dataFoo'];
      expect(results).toEqual(expected);
    });

    it('retrieve the attribute value using getAttribute', function () {
      expect(anchor.getAttribute('style')).toBe('margin: 0;');
    });

    it('set an attribute with setAttribute', function () {
      results = [anchor.getAttribute('data-foo')]
      anchor.setAttribute('data-foo', 'fizzBuzz');
      results.push(anchor.getAttribute('data-foo'));
      expected = ['dataFoo', 'fizzBuzz'];
      expect(results).toEqual(expected);
    });

    it('remove an attribute with removeAttribute', function () {
      anchor.removeAttribute('foo');
      expect(anchor.attributes.length).toBe(5);
    });

    it('add an attribute with set attribute', function () {
      // note boolean attributes such as hidden should always have an
      // accompanying value
      anchor.setAttribute('hidden', 'hidden');
      expect(anchor.attributes.length).toBe(7);
    });

    it('Use hasAttribute to examine whether or not the attribute exists on the element', function () {
      results = [anchor.hasAttribute('class'), anchor.hasAttribute('id')];
      expected = [true, false];
      expect(results).toEqual(expected);
    });

    it('attributes can be used to check the status of a checkbox', function () {
      /*
      Be careful with boolean attributes, they are only true if they are present with no value
      used the checked method to set them in javascript, hasAttribute can be used to find if
      they checked
       */
      let scales = document.getElementById('scales');
      let horns = document.getElementById('horns');
      scales.checked = true;
      expected = [true, false];
      results = [scales.checked, horns.checked];
      expect(results).toEqual(expected);
    });
  });

  describe('Class Attributes', function () {
    let div;
    beforeEach(() => {
      div = document.getElementById('classes');
    });

    it('it is much easier to work with classList than className', function () {
      expected = ['DOMTokenList', 'String', 'big'];
      results = [div.classList.constructor.name, div.className.constructor.name, div.classList[0]];
      expect(results).toEqual(expected);
    });

    it('classList can be used to remove a class', function () {
      expected = ['big brown bear', 'brown bear'];
      results = [div.classList.value];
      div.classList.remove('big');
      results.push(div.classList.value);
      expect(results).toEqual(expected);
    });

    it('classList can be used to add a class', function () {
      expected = ['big brown bear', 'big brown bear bowling'];
      results = [div.classList.value];
      div.classList.add('bowling');
      results.push(div.classList.value);
      expect(results).toEqual(expected);
    });

    it('classList can be used to toggle an existing class', function () {
      expected = ['big brown bear', 'big bear', 'big bear brown'];
      results = [div.classList.value];
      div.classList.toggle('brown');
      results.push(div.classList.value);
      div.classList.toggle('brown');
      results.push(div.classList.value);
      expect(results).toEqual(expected);
    });

    it('classList toggle can be used to add a class', function () {
      expected = ['big brown bear', 'big brown bear bowling'];
      results = [div.classList.value];
      div.classList.toggle('bowling');
      results.push(div.classList.value);
      expect(results).toEqual(expected);
    });

    it('classList can be used to find if a class is on an element', function () {
      expected = [true, false];
      results = [div.classList.contains('bear'), div.classList.contains('foo')];
      expect(results).toEqual(expected);
    });
  });

  describe('Getting and Setting data- attributes', function () {
    let div;
    beforeEach(() => {
      div = document.getElementById('datasets');
    });

    it('get the data- attributes using camel case', function () {
      expected = ['foo', 'bar'];
      results = [div.dataset.fooFoo, div.dataset.barBar];
      expect(results).toEqual(expected);
    });

    it('change a data- attribute', function () {
      expected = ['foo', 'fizz'];
      results = [div.dataset.fooFoo];
      div.dataset.fooFoo = 'fizz';
      results.push(div.dataset.fooFoo);
      expect(results).toEqual(expected);
    });

    it('add a data- attribute', function () {
      div.dataset.gooGoo = 'goo';
      expected = '<div id="datasets" data-foo-foo="foo" data-bar-bar="bar" data-goo-goo="goo">Data Attributes</div>';
      expect(div.outerHTML).toBe(expected);
    });

    it('one can remove a dataset', function () {
      delete div.dataset.barBar;
      expected = '<div id="datasets" data-foo-foo="foo">Data Attributes</div>';
      expect(div.outerHTML).toBe(expected);
    });
  });
});