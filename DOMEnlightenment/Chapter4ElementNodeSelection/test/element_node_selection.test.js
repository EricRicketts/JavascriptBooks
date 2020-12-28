import * as fs from 'fs';
import * as path from 'path';
import { JSDOM } from 'jsdom';

describe('DOM Enlightenment Chapter Four Element Node Selection', function () {
  let window, document, results, expected;
  beforeEach(() => {
    let codeDirectory = path.join(__dirname, '..', 'code');
    let htmlFile = fs.readFileSync(codeDirectory + '/element_node_selection.html');
    window = new JSDOM(htmlFile).window;
    document = window.document;
  });

  it('querySelector and getElementById returns single elements which can be queried', function () {
    results = [
      document.querySelector('li').constructor.name,
      document.getElementById('last').constructor.name,
      document.querySelector('li').textContent,
      document.getElementById('last').textContent
    ];
    expected = ['HTMLLIElement', 'HTMLLIElement', 'Hello', 'world'];
    expect(results).toEqual(expected);
  });

  it('querySelectorAll, getElementsByTagName, getElementsByClassName returns collections', function () {
    let ul = document.getElementById('second');
    results = [
      ul.querySelectorAll('li').constructor.name,
      ul.getElementsByTagName('li').constructor.name,
      ul.getElementsByClassName('liClass').constructor.name,
      ul.querySelectorAll('li').length,
      ul.getElementsByTagName('li').length,
      ul.getElementsByClassName('liClass').length
    ];
    expected = ['NodeList', 'HTMLCollection', 'HTMLCollection', 4, 4, 4];
    expect(results).toEqual(expected);
  });

  it('querySelectorAll returns a static collection', function () {
    let ul = document.getElementById('first');
    let listItems = ul.querySelectorAll('li');
    results = [ul.children.length, listItems.length];
    let li = document.createElement('li');
    let text = document.createTextNode('enough');
    li.appendChild(text);
    ul.appendChild(li);
    results.push(ul.children.length, listItems.length);
    expected = [4, 4, 5, 4];
    expect(results).toEqual(expected);
  });
});
