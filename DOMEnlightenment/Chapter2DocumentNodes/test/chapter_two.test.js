let fs = require('fs');
let path = require('path');
let jsdom = require('jsdom');
const { JSDOM } = jsdom;

describe('DOM Enlightenment Chapter Two Document Node', function () {
  let htmlFile, document, window, results, expected, url, referrer;
  beforeAll(() => {
    url = 'file:///Users/ericricketts/Documents/JavascriptBooks/DOMEnlightenment/' +
      'Chapter2DocumentNodes/code/chapter_two.html';
    referrer = 'file:///Users/ericricketts/Documents/JavascriptBooks/DOMEnlightenment/' +
      'Chapter2DocumentNodes'; 
    let codeDirectory = path.join(__dirname, '..', 'code');
    htmlFile = fs.readFileSync(codeDirectory + '/chapter_two.html', 'utf8');
  });

  beforeEach(() => {
    window = new JSDOM(htmlFile, { url: url, referrer: referrer }).window;
    document = window.document;
  });

  describe('General HTML Document Information', function () {
    it('document object is a HTMLDocument and a DOCUMENT_NODE', function () {
      results = [document.constructor.name, document.nodeType];
      expected = ['Document', Node.DOCUMENT_NODE];
      expect(results).toEqual(expected);
    });

    it('should get document title', function () {
      expect(document.title).toBe('DOM Enlightenment');
    });

    it('should get the full URL of the document', function () {
      expected = url
      expect(document.URL).toBe(expected);
    });

    it('should get the referrer of the document', function () {
      expected = referrer;
      expect(document.referrer).toBe(expected);
    });

    it('should return the date time stamp of its last modification', function () {
      // example date time stamp 11/21/2020 15:54:36
      expected = /\d{1,2}\/\d{1,2}\/\d{4}\s+\d{1,2}:\d{1,2}:\d{1,2}/;
      expect(document.lastModified).toMatch(expected);
    });

    it('should return the compatibility mode of the document', function () {
      expected = 'CSS1Compat';
      expect(document.compatMode).toBe(expected);
    });
  });

  describe('document shortcuts to doctype, html, head and body', function () {

    it('should provide the doctype property', function () {
      expected = 'DocumentType';
      expect(document.doctype.constructor.name).toBe(expected);
    });

    it('should the type of document', function () {
      // document.documentElement would provide the entire HTML starting with <!DOCTYPE html>
      expect(document.documentElement.constructor.name).toBe('HTMLHtmlElement');
    });

    it('should provide the head element', function () {
      // document.head provides the entire HTML of the head element
      expect(document.head.constructor.name).toBe('HTMLHeadElement');
    });

    it('should provide the body element', function () {
      // document.body provides the entire HTML of the body element
      expect(document.body.constructor.name).toBe('HTMLBodyElement');
    });
  });

  describe('Miscellaneous Topics', function () {

    it('should find out what element has focus at the document level', function () {
      document.getElementById('comment').focus();
      expected = '<textarea name="comment" id="comment" cols="30" rows="10"></textarea>';
      expect(document.activeElement.outerHTML).toBe(expected);
    });

    it('should allows user to find if the current window has the HTML document loaded', function () {
      // this will be false in JSDOM because there is not real browser
      expect(document.hasFocus()).toBe(false);
    });

    
  });
});