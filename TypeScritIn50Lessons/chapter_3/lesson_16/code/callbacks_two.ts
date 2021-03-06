import { Result } from "../../@types/types";

function searchFn(
  query: string,
  tags?: string[],
): Promise<Result[]> {
  let queryString = `?query=${query}`;
  if (tags && tags.length) {
    queryString += `&tags=${tags.join(',')}`;
  }
  return fetch(`/search${queryString}`)
    .then(response => response.json());
}
declare function displaySearch(
  inputId: string,
  outputId: string,
  search: typeof searchFn
): void;

displaySearch('searchField', 'result', searchFn);

displaySearch(
  'searchField',
  'result',
  function(query) { // we can add the parameter tags but TypeScript issues an unused parameter warning
    return Promise.resolve([{ // but not an error so compile will still take place
      title: `The ${query} test book`,
      url: `/${query}-design-patterns`,
      abstract: `A practical book in ${query}`
    }])
  }
);

// note the above was an anonymous function but if fits the underlying shape of searchFn it is fine
// another option is to define a function cast to searchFn and pass that in

type searchFnTwo = (
  query: string,
  tags?: string[],
) => Promise<Result[]>

const testSearch: searchFnTwo = function(query, tags) {
  return Promise.resolve([{
    title: `The ${query} test book`,
    url: `/${query}-design-patterns`,
    abstract: `A practical book in ${query}`
  }]);
}

displaySearch('searchField', 'result', testSearch);