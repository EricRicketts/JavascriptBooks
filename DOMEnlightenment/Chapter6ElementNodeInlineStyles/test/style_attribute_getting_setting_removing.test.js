import * as path from 'path';
import * as fs from 'fs';
import { JSDOM } from 'jsdom';

describe('Element Node Inline Styles', function () {
  let window, document, inline, empty, cascade, expected, results;
  beforeEach(() => {
    let codeDirectory = path.join(__dirname, '..', 'code');
    let htmlFile = fs.readFileSync(codeDirectory + '/style_attribute_getting_setting_removing.html', 'utf8');
    window = new JSDOM(htmlFile).window;
    document = window.document;
    inline = document.getElementById('inline');
    cascade = document.getElementById('cascade');
    empty = document.getElementById('empty');
  });
  describe('Style Attribute', function () {
    it('style property is a CSSStyleDeclaration Object', function () {
      expect(inline.style.constructor.name.toString()).toBe('CSSStyleDeclaration');
    });

    it('style property accesses inline styles not computed styles', function () {
      expected = ['red', ''];
      results = [inline.style.backgroundColor, cascade.style.backgroundColor];
      expect(results).toEqual(expected);
    });
  });

  describe('Getting, Setting, and Removing style attributes', function () {
    it('style property can be used as a getter', function () {
      expect(inline.style.backgroundColor).toBe('red');
    });

    it('style property can be used as a setter', function () {
      expected = ['red', 'green'];
      results = [inline.style.backgroundColor];
      inline.style.backgroundColor = 'green';
      results.push(inline.style.backgroundColor);
      expect(results).toEqual(expected);
    });

    it('style property can remove a property', function () {
      expected = ['1px solid black', ''];
      results = [inline.style.border];
      inline.style.border = '';
      results.push(inline.style.border);
      expect(results).toEqual(expected);
    });
  });

  describe('Syntax alternatives to style camel case properties', function () {
    it('getPropertyValue must use CSS property name', function () {
      expect(inline.style.getPropertyValue('background-color')).toBe('red');
    });

    it('setPropertyValue must use CSS property name and property value', function () {
      expected = ['1px solid black', '2px dashed green'];
      results = [inline.style.getPropertyValue('border')];
      inline.style.setProperty('border', '2px dashed green');
      results.push(inline.style.getPropertyValue('border'));
      expect(results).toEqual(expected);
    });

    it('removeProperty removes a property', function () {
      expected = ['1px solid black', ''];
      results = [inline.style.getPropertyValue('border')];
      inline.style.removeProperty('border');
      results.push(inline.style.getPropertyValue('border'));
      expect(results).toEqual(expected);
    });
  });
});