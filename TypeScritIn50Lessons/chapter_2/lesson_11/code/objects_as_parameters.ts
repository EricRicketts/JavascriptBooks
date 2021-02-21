import { Article, ShopItem } from "../../@types/types";
import { addVAT } from "../../lesson_8/code/example-two";

function createArticleElement(article: Article): string {
  const title = article.title;
  const price = addVAT(article.price, article.vat);
  return `<h2> ${title} for ${price}</h2>`;
}

const shopItem = {
  title: 'Helvetica',
  price: 6.66,
  vat: 0.19,
  stock: 100,
  description: '90 minutes gushing about Helvetica',
  rating: 5
}

createArticleElement(shopItem); // this is OK though shopItem has not been declared to be
// an Article type it still meets the input requirement needs as it has all of the right properties.

function createArticleElementTwo(article: { title: string, price: number, vat: number }): string {
  const title = article.title;
  const price = addVAT(article.price, article.vat);
  return `<h2> ${title} for ${price}</h2>`;
}

// in this case we can be more specific about what we ask for
const movie: Article = {
  title: 'Helvetica',
  price: 6.66,
  vat: 0.19,
  stock: 100,
  description: '90 minutes gushing about Helvetica'
}

createArticleElementTwo(movie);
createArticleElementTwo({
  title: 'Helvetica',
  price: 6.66,
  vat: 0.19,
  rating: 5
});

// throws an error, too many explicit arguments