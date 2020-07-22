import * as fs from 'fs';
import * as path from 'path';
let jsdom = require('jsdom');
const { JSDOM } = jsdom;

describe('Understanding JSDOM, Jest and basic DOM Node Attributes', function () {
  let codeDirectory, htmlFile, props, nodeAnchor, window, document, results, expected;
  beforeEach(() => {
    props = [];
    codeDirectory = path.join(__dirname, '..', 'code');
    htmlFile = fs.readFileSync(codeDirectory + '/basic.html', 'utf8');
    window = new JSDOM(htmlFile).window;
    document = window.document;
    nodeAnchor = document.querySelector('a');
  });

  describe('Object hierarchy is the same as the browser', function () {
    let Node;
    beforeEach(() => {
      let parent = Object.getPrototypeOf(nodeAnchor);
      let objectName = parent.constructor.name;
      while (objectName !== 'Node') {
        parent = Object.getPrototypeOf(parent);
        objectName = parent.constructor.name;
      }
      Node = parent;
    });
    it('We can get all the keys of and HTMLElement own and inherited', function () {
      for (let key in nodeAnchor) {
        props.push(key);
      }
      let sortedProps = props.sort();
      expect(props.length).toBeGreaterThan(200);
      expect(sortedProps.includes('insertAdjacentElement')).toBe(true);
    });

    it('should traverse the node element hierarchy', function () {
      let firstParent = Object.getPrototypeOf(nodeAnchor);
      let secondParent = Object.getPrototypeOf(firstParent);
      let thirdParent = Object.getPrototypeOf(secondParent);
      let fourthParent = Object.getPrototypeOf(thirdParent);
      let fifthParent = Object.getPrototypeOf(fourthParent);
      let sixthParent = Object.getPrototypeOf(fifthParent);
      results = [
        firstParent.constructor.name, secondParent.constructor.name,
        thirdParent.constructor.name, fourthParent.constructor.name,
        fifthParent.constructor.name, sixthParent.constructor.name
      ];
      expected = [
        'HTMLAnchorElement', 'HTMLElement', 'Element',
        'Node', 'EventTarget', 'Object'
      ];
      expect(results).toEqual(expected);
    });
    
    it('We can get all of the properties of the Node object', function () {
      expect(Object.keys(Node).length).toBe(47);
    });

    it('Node property values are the same in the JSDOM as the browser', function () {
      expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 4, 8, 16, 32];
      results = Object.keys(Node.constructor).reduce((values, propertyName) => {
        values.push(Node[propertyName]);
        return values;
      }, []);
      expect(results).toEqual(expected);
    });

    it('nodeAnchor is an HTMLAnchorElement with its own properties', function () {
      results = Object.getOwnPropertyNames(nodeAnchor).reduce((names, property) => {
        names.push(property);
        return names;
      }, []);
      expect(nodeAnchor.constructor.name).toBe('HTMLAnchorElement');
    });
  });

  describe('Get Most Common Node Types and Node Names', function () {
    it('document object should have a DOCUMENT_TYPE_NODE value 10', function () {
      expected = ['html', 10];
      results = [document.doctype.nodeName, document.doctype.nodeType];
      expect(results).toEqual(expected);
    });

    it('document object itself should be a DOCUMENT_NODE with a value of 9', function () {
      expected = ['#document', 9];
      results = [document.nodeName, document.nodeType]
      expect(results).toEqual(expected);
    });

    it('document fragment should be a DOCUMENT_FRAGMENT_TYPE_NODE with a value of 11', function () {
      expected = ['#document-fragment', 11];
      results = [document.createDocumentFragment().nodeName, document.createDocumentFragment().nodeType];
      expect(results).toEqual(expected);
    });

    it('an element should be an ELEMENT_TYPE with a value of 1', function () {
      expected = ['A', 1];
      results = [nodeAnchor.nodeName, nodeAnchor.nodeType];
      expect(results).toEqual(expected);
    });

    it('a text element should be a TEXT_NODE with a value of 3', function () {
      expected = ['#text', 3];
      results = [nodeAnchor.firstChild.nodeName, nodeAnchor.firstChild.nodeType];
      expect(results).toEqual(expected);
    });

    it('one can use nodeType to quickly determine a node\'s type', function () {
      expected = [1, 1];
      results = [nodeAnchor.nodeType, Node.ELEMENT_NODE];
      expect(results).toEqual(expected);
    });
  });

  describe('Getting Node Values', function () {
    it('nodeValue default value is null if no text is present', function () {
      expected = [null, null, null, null];
      results = [
        document.doctype.nodeValue, document.nodeValue,
        document.createDocumentFragment().nodeValue, document.querySelector('a').nodeValue
      ];
      expect(results).toEqual(expected);
    });

    it('nodeValue used to get text strings from Text and Comment Nodes', function () {
      expect(nodeAnchor.firstChild.nodeValue).toBe('Hi');
    });
  });
});