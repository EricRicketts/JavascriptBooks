import { Article } from "../../@types/types";
interface ShopItem {
  title: string;
  price: number;
  vat: number;
  stock?: number;
  description?: string;
}
class Discount {
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
      article.price = article.price - (article.price * this.amount);
    } else {
      article.price = article.price - this.amount;
    }
  }
}

describe('A type and an interface can be interchangeable if they have the same properties', function () {
  let results, expected, discount: Discount, shopItem: ShopItem, article: Article
  beforeEach(() => {
    discount = new Discount(true, 0.2);
    shopItem = { title: 'Hasbro Toy', price: 40, vat: 0.2 };
    article = { title: 'Hasbro Toy', price: 40, vat: 0.2 };
  });

  it('should be able to use either interface or type and get the same result', function () {
    expected = [40, 40, 32, 32];
    results = [shopItem.price, article.price];
    [shopItem, article].forEach(item => discount.apply(item));
    results.push(shopItem.price, article.price);
    expect(results).toEqual(expected);
  });

  it('a class can be defined using an interface', function () {
    class DVD implements ShopItem {
      title: string
      price: number
      vat: number

      constructor(title: string) {
        this.title = title;
        this.price = 10.00;
        this.vat = 0.2;
      }
    }
    let dvd = new DVD('Ghost Riders In The Sky');
    expected = ['Ghost Riders In The Sky', 10.00, 0.2, 8];
    results = [dvd.title, dvd.price, dvd.vat];
    discount.apply(dvd);
    results.push(dvd.price)
    expect(results).toEqual(expected);
  });

  it('a class can be defined using a type', function () {
    class Book implements Article {
      title: string
      price: number
      vat: number

      constructor(title: string) {
        this.title = title;
        this.price = 40;
        this.vat = 0.2;
      }
    }
    let book = new Book('The Lord of the Rings');
    expected = ['The Lord of the Rings', 40, 0.2, 32];
    results = [book.title, book.price, book.vat];
    discount.apply(book);
    results.push(book.price)
    expect(results).toEqual(expected);
  });
});