import { Result } from "../../@types/types";

function highlight(
  strings: TemplateStringsArray,
  ...values: string[]
) {
  let str = ''; // result string
  strings.forEach((templ, i) => {
    let expr = values[i]?.replace('@@start@@', '<em>')
      .replace('@@end@@', '</em>') ?? '';
    str += templ + expr;
  });
  return str;
}

function createResultsTemplate(results: Result[]): string {
  return `<ul>${results.map(result => highlight`<li>${result.title}</li>`)}</ul>`
}

// we can do the above because TypeScript recognizes highlight as takign a template as a parameter
// so the invocation of highlight is an argument that is a template and an array that is an array of strings

async function searchThree(
  term: string,
  ...tags: string[]
) {
  let queryString = `query=${term}`;
  if (tags && tags.length > 0) {
    queryString += `&tags${tags.join(',')}`;
  }
  const response = await fetch(`/search${queryString}`)
  const results = await response.json();
  return results as Result[];
}

const foo = await searchThree('Ember');