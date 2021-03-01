import { Result, QueryVersionOne, QueryVersionTwo } from "../../@types/types";

function search(query: string, tags?: string[]): Promise<Result[]> {
  let queryString = `?query=${query}`;

  if (tags && tags.length) {
    queryString += `&tags=${tags.join()}`;
  }

  return fetch(`/search/${queryString}`)
    .then(response => response.json());
}

type searchFn = typeof search;

const query: QueryVersionOne = {
  query: 'Ember',
  tags: ['Javascript'],
  assemble(includeTags= false) {
    let query = `?query=${this.query}`;
    if (includeTags && typeof this.tags !== 'undefined') {
      query += `&${this.tags.join(',')}`;
    }
    return query;
  }
}

const anotherQuery: QueryVersionTwo = {
  query: 'Ember',
  tags: ['Javascript'],
  assemble(includeTags= false) {
    let query = `?query=${this.query}`;
    if (includeTags && typeof this.tags !== 'undefined') {
      query += `&${this.tags.join(',')}`;
    }
    return query;
  }
}
