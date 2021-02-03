import * as path from 'path';
import * as fs from 'fs';
import { JSDOM } from 'jsdom';

describe('Basic Offset Methods', function () {
  let window, document, red, blue, expected, results;
  beforeEach(() => {
    let codeDirectory = path.join(__dirname, '..', 'code'); 
    let htmlFile = fs.readFileSync(codeDirectory + '/basic_offset.html', 'utf8'); 
    window = new JSDOM(htmlFile).window;
    document = window.document;
    blue = document.getElementById('blue');
    red = document.getElementById('red');
  });

  it('should measure top left hand corner of the embedded red colored div', function () {
    /*
    expected = [60, 60];
    results = [red.offsetTop, red.offsetLeft];
    expect(results).toEqual(expected);

    unfortunately, these CSSOM View Module properties do not work in jsdom, but the measurements are
    take with respect to the parent element.  The parent element is the nearest ancestor which does
    not have a CSS position property of static (which is the default position property).  In this case
    both divs are static positioned, so the parent element becomes the body.

    the blue had offsetTop and offsetLeft of 25px, measurements are taken from the inside border of
    the parent to the outside border of the child
     */
  });
});