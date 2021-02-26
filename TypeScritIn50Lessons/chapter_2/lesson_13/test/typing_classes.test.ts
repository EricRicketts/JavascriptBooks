import { Article } from "../../@types/types";
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
class TwentyPercentDiscount extends Discount {
  constructor() {
    super(true, 0.2);
  }

  apply(article:Article) {
    if(this.isValidForDiscount(article)) {
      super.apply(article);
    }
  }

  isValidForDiscount(article: Article) {
    return article.price <= 40;
  }
}
describe('Lesson 13: Typing Classes', function () {
  let results, expected, article: Article, discount: Discount;
  beforeEach(() => {
    article = {
      title: 'a robot toy',
      price: 30,
      vat: 0.1,
    }
    discount = new Discount(false, 10);
  });

  describe('Basic class use', function () {
    it('should run the discount class as expected', function () {
      discount.apply(article);
      expect(article.price).toBe(20);
    });
  });

  describe('Structural Typing With Classes', function () {
    let allProductsTwentyBucks: Discount, secondArticle: Article;
    beforeEach(() => {
      allProductsTwentyBucks = {
        isPercentage: false,
        amount: 20,
        apply(article: Article) {
          article.price = 20;
        }
      }
      secondArticle = {
        title: 'another toy',
        price: 40,
        vat: 0.1
      }
    });

    it('should create regularly assigned objects to a variable of type Discount', function () {
      allProductsTwentyBucks.apply(secondArticle);
      expected = [false, 20];
      results = [allProductsTwentyBucks.isPercentage, secondArticle.price];
      expect(results).toEqual(expected);
    });

    it('should defined an object type and new object of that type by using the constructor', function () {
      type DiscountType = {
        isPercentage: boolean,
        amount: number,
        apply(article: Article): void
      }
      let disco: DiscountType = new Discount(true, 0.2);
      let thirdArticle: Article = { title: 'Lego Transformer', price: 40, vat: 0.2 };
      expected = [40, 32];
      results = [thirdArticle.price];
      disco.apply(thirdArticle);
      results.push(thirdArticle.price);
      expect(results).toEqual(expected);
    });
  });

  describe('Extending Classes', function () {
    it('if more properties are available we can still have a Discount Object', function () {
      let disco1: Discount = new TwentyPercentDiscount();
      let article: Article = {
        title: 'Hasbro Toy',
        price: 30,
        vat: 0.1
      }
      results = [article.price];
      disco1.apply(article);
      results.push(article.price);
      expected = [30, 24];
      expect(results).toEqual(expected);
      // however, the reverse will not work because there is a shortage of properties
      // let disco2: TwentyPercentDiscount = new Discount(true, 0.3); this would raise a TypeScript error
      // as there are more properties in the TwentyPercentDiscount class than the Discount class
    });
  });
});