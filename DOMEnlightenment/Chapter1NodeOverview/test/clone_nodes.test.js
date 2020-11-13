let fs = require('fs');
let path = require('path');
let jsdom = require('jsdom');
const { JSDOM } = jsdom;

describe('Cloning Nodes', function () {
  let document, results, expected;
  beforeEach(() => {
    let codeDirectory = path.join(__dirname, '..', 'code');
    let htmlFile = fs.readFileSync(codeDirectory + '/clone_nodes.html', 'utf8');
    let window = new JSDOM(htmlFile).window;
    document = window.document;
  });

  it('clone by default does not clone children', function () {
    let ul = document.querySelector('ul').cloneNode();
    expect(ul.outerHTML).toBe('<ul></ul>');
  });

  it('cloneNode clones all children if argument is true', function () {
    let ul = document.querySelector('ul').cloneNode(true);
    let parent = document.querySelector('ul').parentElement;
    let parentInnerHTML = parent.innerHTML;
    let ulHTML = parentInnerHTML.replace(/\s+/g, '');
    expected = '<ul><li>1</li><li>2</li><li>3</li></ul>';
    expect(ulHTML).toBe(expected);
  });
});