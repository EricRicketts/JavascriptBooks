import * as path from 'path';
import * as fs from 'fs';
import { JSDOM } from 'jsdom';

describe('cssText property use cases', function () {
  let window, document, results, expected, div, divStyle, cssStr, cssStrExpected;
  beforeEach(() => {
    let codeDirectory = path.join(__dirname, '..', 'code');
    let htmlFile = fs.readFileSync(codeDirectory + '/css_text_property.html', 'utf8');
    window = new JSDOM(htmlFile).window;
    document = window.document;
    div = document.querySelector('div');
    divStyle = div.style;
    cssStr = 'background-color:red;border:1px solid black;height:100px;width:100px;';
    cssStrExpected = 'background-color: red; border: 1px solid black; height: 100px; width: 100px;'
  });

  it('cssText can be used to add and remove many different css properties at once', function () {
    expected = ['', cssStrExpected, ''];
    results = [divStyle.cssText];
    divStyle.cssText = cssStr;
    results.push(divStyle.cssText);
    divStyle.cssText = '';
    results.push(divStyle.cssText);
    expect(results).toEqual(expected);
  });

  it('setAttribute and getAttribute can be used to accomplish what cssText can do', function () {
    expected = [null, cssStr, null];
    results = [div.getAttribute('style')];
    div.setAttribute('style', cssStr);
    results.push(div.getAttribute('style'));
    div.removeAttribute('style');
    results.push(div.getAttribute('style'));
    expect(results).toEqual(expected);
  });
});