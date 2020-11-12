import * as fs from 'fs';
import * as path from 'path';
let jsdom = require('jsdom');
const { JSDOM } = jsdom;

describe('appendChild, insertBefore, removeChild, replaceChild', function () {
  let document, results, expected;
  beforeEach(() => {
    let codeDirectory = path.join(__dirname, '..', 'code');
    let htmlFile = fs.readFileSync(codeDirectory + '/manipulation_part_three.html', 'utf8');
    let window = new JSDOM(htmlFile).window;
    document = window.document;
  });

  describe('appendChild and insertBefore methods', function () {
    it('appendChild appends an element after the last child in the node', function () {
      let p = document.querySelector('p');
      let em = document.createElement('em');
      let text = document.createTextNode('Hey');
      em.appendChild(text);
      p.appendChild(em);
      expected = '<p>Hi<strong>Ho</strong><em>Hey</em></p>';
      expect(p.outerHTML).toBe(expected);
    });

    it('insertBefore inserts a node before the designated child of the parent', function () {
      let ul = document.querySelector('ul');
      let firstLi = ul.firstElementChild;
      let li = document.createElement('li');
      let text = document.createTextNode('1');
      li.appendChild(text);
      ul.insertBefore(li, firstLi);
      expected = '<ul><li>1</li><li>2</li><li>3</li></ul>';
      expect(ul.outerHTML).toBe(expected);
    });

    it('removeChild uses the parent node', function () {
      let divA = document.getElementById('A');
      divA.parentNode.removeChild(divA);
      let divB = document.getElementById('B');
      let divBText = divB.firstChild;
      divB.removeChild(divBText);
      expected = [null, '<div id="B"></div>'];
      results = [document.getElementById('A'), divB.outerHTML];
      expect(results).toEqual(expected);
    });

    it('replaceChild uses the parent node', function () {
      let divA = document.getElementById('A');
      results = [divA.outerHTML];
      let p = document.createElement('p');
      let text = document.createTextNode('Foo Bar');
      p.appendChild(text);
      p.setAttribute('id', 'A');
      divA.parentNode.replaceChild(p, divA);
      results.push(document.getElementById('A').outerHTML);
      expected = ['<div id="A">Hi</div>', '<p id="A">Foo Bar</p>'];
      expect(results).toEqual(expected);
    });

    it('replaceChild can replace text', function () {
      let divB = document.getElementById('B');
      let divBText = divB.firstChild;
      let text = document.createTextNode('Foo Bar');
      results = [divB.textContent];
      divB.replaceChild(text, divBText);
      results.push(divB.textContent);
      expected = ['Dude', 'Foo Bar'];
      expect(results).toEqual(expected);
    });
  });
});
