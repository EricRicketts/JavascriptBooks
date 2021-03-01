import { Result } from "../../@types/types";

describe('Using a declared function', function () {
  let firstSearch: any, secondSearch: any;
  beforeEach(() => {
    firstSearch = function(query: string, tags?: string[]) {
      let queryString = `?query=${query}`;
      if (tags && tags.length) {
        queryString += `&tags=${tags.join(',')}`;
      }
      return queryString;
    }
    secondSearch = function(query: string, tags?: string[]) {
      let queryString = `?query=${query}`;
      if (tags && tags.length) {
        queryString += `&tags=${tags.join(',')}`;
      }
      return fetch(`/search${queryString}`)
        .then(response => response.json());
    }
  });

  it('should handle no second parameter', function () {
    expect(firstSearch('foo')).toBe('?query=foo');
  });

  it('should handle a second parameter', function () {
    expect(firstSearch('foo', ['bar', 'fizz', 'buzz'])).toBe('?query=foo&tags=bar,fizz,buzz');
  });
});