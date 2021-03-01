import { Result } from "../../@types/types";

function search(query: string, tags?: string[]) {
  let queryString = `?query=${query}`;

  if (tags && tags.length) {
    queryString += `&tags=${tags.join()}`;
  }

  // we know the return value of fetch is a promise
  // Promise<Response> however, the type of response.json() is Promise<any>
  // we should fix that in the next two versions
  return fetch(`/search/${queryString}`)
    .then(response => response.json());
}

// in these next two versions we have specified an Result type as the content of the returned Promise
// the Result type was imported from the first line in this file.
function searchVersionTwo(query: string, tags?: string[]) {
  let queryString = `?query=${query}`;

  if (tags && tags.length) {
    queryString += `&tags=${tags.join()}`;
  }

  return fetch(`/search/${queryString}`)
    .then(response => response.json() as Promise<Result[]>);
}

function searchVersionThree(query: string, tags?: string[]): Promise<Result[]> {
  let queryString = `?query=${query}`;

  if (tags && tags.length) {
    queryString += `&tags=${tags.join()}`;
  }

  return fetch(`/search/${queryString}`)
    .then(response => response.json());
}
