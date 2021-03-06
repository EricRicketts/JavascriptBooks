import { Result } from "../../@types/types";

type searchFnThree = (
  query: string,
  tags?: string[],
) => Promise<Result[]>

const dummyContentSearchFn: searchFnThree = function() {
  return Promise.resolve([{
    title: 'Form Design Patterns',
    url: `/form-design-patterns`,
    abstract: 'a practical book on accessible forms'
  }]);
}

// looks like at first dummyContentSearch does not fit the shape of searchFnThree because it is missing a
// required query argument.  However, if we were to CALL dummyContentSearch with no parameters,
// dummyContentSearchFn(), TypeScript would flag an error.  In this case since we are casting dummyContentSearchFn
// to searchFnThree the parameters of searchFnThree implicitly exist, we choose not to do anything with them
// in the function body.

// if were were to define a different version of dummyContentSearch with no type cast and no parameters, would
// would get an error if we called the function WITH parameters

function dummyContentSearchFnVersionTwo() {
  return Promise.resolve([{
    title: 'Form Design Patterns',
    url: `/form-design-patterns`,
    abstract: 'a practical book on accessible forms'
  }]);
}

dummyContentSearchFnVersionTwo('Ember'); // error because function contract is with no parameters

declare function displaySearchTwo(
  inputId: string,
  outputId: string,
  search: searchFnThree
): Promise<Result>

// this works because even through dummyContentSearchFnVersionTwo has no parameters it takes on the shape of
// searchFnThree, this behavior is called substitutability.  This works in this case because the return value
// types for searchFnThree and dummyContentSearchFnVersionTwo are the same.
displaySearchTwo('Foo', 'Bar', dummyContentSearchFnVersionTwo);

function searchTwo(
  query: string,
  callback: (results: Result[]) => void,
  tags?: string[]
){
  let queryString = `?query=${query}`;
  if (tags && tags.length) {
    queryString += `&tags=${tags.join(',')}`;
  }
  fetch(`/search${queryString}`)
    .then(res => res.json() as Promise<Result[]>)
    .then(results => callback(results))
}

// two options for calling
searchTwo('Ember', function(results) {
  return results;
});

function searchHandler(results: Result[]) {
  return results;
}
searchTwo('Ember', searchHandler);

// However this works because we can substitute any return type for void
function searchHandlerTwo(results: Result[]): number {
  return results.length;
}
searchTwo('Ember', searchHandlerTwo);
