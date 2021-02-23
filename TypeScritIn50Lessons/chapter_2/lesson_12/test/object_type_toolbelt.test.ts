import { Article, ShopItem, Address, Customer, DefaultOrder  } from '../../@types/types';

describe('Testing Import Behavior', function () {
  let defaultOrder, book:Article, results, expected;
  beforeEach(() => {
    book = {
      price: 29,
      vat: 0.2,
      title: 'Another book by Smashing books'
    }
  });

  it('should handle value assignments properly', function () {
    // book.price = 'foo'; we get the red underlines in this assignment
    expect(book.price).toBe(29);
  });
});