type Result = {
  title: string,
  url: string,
  abstract: string
}

type QueryVersionOne = {
  query: string;
  tags?: string[];
  assemble: (includeTags: boolean) => string;
}

type AssembleFn = (includeTags: boolean) => string;

type QueryVersionTwo = {
  query: string;
  tags?: string[];
  assemble: AssembleFn;
}

export { Result, QueryVersionOne, QueryVersionTwo };