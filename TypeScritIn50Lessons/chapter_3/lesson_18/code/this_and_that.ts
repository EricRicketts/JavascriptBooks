import { Result } from "../../@types/types";

type searchFn = (
  query: string,
  tags?: string[],
) => Promise<Result>

declare function displaySearch(
  inputId: string,
  outputId: string,
  search: searchFn
): void;

// adding dynamic features, the code does not work because the supertype of all html elements is HTMLElement
// and that does not provide the value property.  We can work around this by a type guard check.

function displaySearchTwo(
  inputId: string,
  outputId: string,
  search: searchFn
): void {
  document.getElementById(inputId)?.addEventListener('change', function() {
    this.parentElement?.classList.add('active');
    const searchTerm = this.value;
  });
}

function displaySearchThree(
  inputId: string,
  outputId: string,
  search: searchFn
): void {
  document.getElementById(inputId)?.addEventListener('change', function() {
    this.parentElement?.classList.add('active');
    if (this instanceof HTMLInputElement) {
      const searchTerm = this.value; // this works because TypeScript knows about the DOM interface
    }
  });
}

function inputChangeHandler() {
  this.parentElement?.classList.add('active');
  // problem here is that 'this' has type 'any' implicitly there is not type annotation for it
  // and a function can be bound to any value for 'this'
}

function displaySearchFour(
  inputId: string,
  outputId: string,
  search: searchFn
): void {
  document.getElementById(inputId)?.addEventListener('change', inputChangeHandler)
  // in the context above we have some kind of HTMLElement but inputChangeHandler is not aware
}

// however, TypeScript allows us to type 'this'

function inputChangeHandlerTwo(this: HTMLElement) {
  this.parentElement?.classList.add('active');
}

inputChangeHandlerTwo();
// we can only use inputChangeHandler in a context where 'this' is guaranteed to be HTMLElement or a child of it
