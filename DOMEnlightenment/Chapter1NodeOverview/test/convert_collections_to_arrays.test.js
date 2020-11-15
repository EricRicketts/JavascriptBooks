let fs = require('fs');
let path = require('path');
let jsdom = require('jsdom');
const { JSDOM } = jsdom;

describe('NodeList and HTMLCollections are not arrays', function () {
  let document, results, expected, ul;
  beforeEach(() => {
    let codeDirectory = path.join(__dirname, '..', 'code');
    let htmlFile = fs.readFileSync(codeDirectory + '/clone_nodes.html', 'utf8');
    let window = new JSDOM(htmlFile).window;
    document = window.document;
    ul = document.querySelector('ul');
  });

  it('NodeLists are not arrays', function () {
    expect(Array.isArray(ul.childNodes)).toBe(false);
  });

  it('HTMLCollections are not arrays', function () {
    expect(Array.isArray(ul.children)).toBe(false);
  });

  it('NodeLists and HTMLCollections can be converted to arrays', function () {
    results = [Array.from(ul.childNodes), Array.from(ul.children)];
    expected = [true, true];
    results = [Array.isArray(results[0]), Array.isArray(results[1])];
    expect(results).toEqual(expected);
  });
});