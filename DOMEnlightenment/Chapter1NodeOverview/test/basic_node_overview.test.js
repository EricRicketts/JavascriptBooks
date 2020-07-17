import * as fs from 'fs';
import * as path from 'path';
import {
  first,
  second
} from "../../../UdemyLearnAndUnderstandNodeJS/Section5EventsAndTheEventEmitter/files/Miscellaneous/four_functions";
describe('Understanding JSDOM, Jest and basic DOM Node Attributes', function () {
  let codeDirectory, props, nodeAnchor, results, expected;
  beforeEach(() => {
    props = [];
    codeDirectory = path.join(__dirname, '..', 'code');
    document.body.innerHTML = fs.readFileSync(codeDirectory + '/basic.html',  'utf8');
    nodeAnchor = document.querySelector('a');
  });
  
  it('document.body comes by default, we can populate the innerHTML', function () {
    expect(document.body.innerHTML).toBe('<a href="#">Hi</a>');
  });

  it('We can get all the keys of and HTMLElement', function () {
    for (let key in nodeAnchor) {
      props.push(key);
    }
    let sortedProps = props.sort();
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
});