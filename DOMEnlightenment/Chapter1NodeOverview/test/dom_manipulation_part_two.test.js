import * as fs from 'fs';
import * as path from 'path';
let jsdom = require('jsdom');
const { JSDOM } = jsdom;

describe('DOM Manipulation Part Two', function () {
  let codeDirectory, document, results, expected;
  beforeEach(() => {
    codeDirectory = path.join(__dirname, '..', 'code');
    let htmlFile = fs.readFileSync(codeDirectory + '/manipulation_part_two.html', 'utf8');
    let window = new JSDOM(htmlFile).window
    document = window.document;
  });

  it('appendChild adds a child to a node with no children', function () {
    let elementNode = document.createElement('strong');
    let textNode = document.createTextNode(' Dude');
    document.querySelector('p').appendChild(elementNode);
    document.querySelector('strong').appendChild(textNode);
    expected = '<p>Hi<strong> Dude</strong></p>';
    expect(document.querySelector('p').outerHTML).toBe(expected);
  });

  it('insertBefore allows more fine grained control of element insertion', function () {
    let text = document.createTextNode('1');
    let li = document.createElement('li');
    li.appendChild(text);
    let ul = document.querySelector('ul:first-of-type');
    ul.insertBefore(li, ul.firstChild);
    expected = '<ul><li>1</li><li>2</li><li>3</li></ul>';
    let strippedHTML = ul.outerHTML.replace(/\s/g,'');
    expect(strippedHTML).toBe(expected);
  });

  it('We must call removeChild on a Parent Node', function () {
    let divA = document.getElementById('A');
    divA.parentNode.removeChild(divA);
    let textB = document.getElementById('B').firstChild;
    textB.parentNode.removeChild(textB);
    expected = [null, '<div id="B"></div>'];
    results = [
      document.getElementById('A'),
      document.getElementById('B').outerHTML
    ];
    expect(results).toEqual(expected);
  });
});