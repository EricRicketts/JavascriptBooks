export type Article = {
  title: string,
  price: number,
  vat: number,
  stock?: number,
  description?: string
}

export type ShopItem = {
  title: string,
  price: number,
  vat: number,
  stock: number,
  description: string,
  rating: number
}

export type Address = {
  city: string,
  zip: string,
  street: string,
  number: string
}

export type Customer = {
  name: string,
  address: Address,
  dateOfBirth: date
}

export type DefaultOrder = {
  articles: Article[],
  customer: Customer
}

export class Discount {
  isPercentage: boolean;
  amount: number;

  constructor(
    isPercentage: boolean,
    amount: number
  ) {
    this.isPercentage = isPercentage;
    this.amount = amount;
  }

  apply(article: Article) {
    if (this.isPercentage) {
      article.price = article.price - (article.price - this.amount);
    } else {
      article.price = article.price - this.amount;
    }
  }
}