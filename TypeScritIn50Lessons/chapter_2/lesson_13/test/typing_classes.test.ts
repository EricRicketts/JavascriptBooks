import { Article, Discount } from "../../@types/types";

describe('Lesson 13: Typing Classes', function () {
  let results, expected, article: Article, discount: Discount;
  beforeEach(() => {
    article = {
      title: 'a robot toy',
      price: 30,
      vat: 0.1,
    }
    discount = new Discount(true, 0.2);
  });

  describe('Basic class use', function () {
    it('should run the discount class as expected', function () {
      discount.apply(article);
      expect(article.price).toBe(24);
    });
  });
});