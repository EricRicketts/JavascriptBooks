import { Article } from "../../@types/types";
import { ShopItem } from "../../@types/types";

const movie: Article  = {
  title: 'Helvetica',
  price: 6.66,
  vat: 0.19,
  stock: 1000,
  description: '90 minutes of gushing about Helvetica'
}

// we see everything checks here all of the properties are in place

const movieTwo: Article  = {
  title: 'Helvetica',
  price: 6.66,
  vat: 0.19,
  stock: 1000
}

// TypeScript flags this declaration because there is no descriptor property

const movieThree: Article = {
  title: 'Helvetica',
  price: 6.66,
  vat: 0.19,
  stock: 1000,
  description: '90 minutes of gushing about Helvetica',
  rating: 5
}

// TypeScript flags this declaration because rating is not a property in the Article Object

const Backup = {
  title: 'Helvetica',
  price: 6.66,
  vat: 0.19,
  stock: 1000,
  description: '90 minutes of gushing about Helvetica',
  rating: 5
}
// this is OK because it was not declared as an Article type

const movieFour: Article = Backup; // surprisingly this is OK because all of the properties in
// Backup are present to satisfy the Article requirement even though there is an extra rating property
// the TypeScript contract only cares about the right types of a certain set of properties.

const shopItem: ShopItem = {
  title: 'Helvetica',
  price: 6.66,
  vat: 0.19,
  stock: 1000,
  description: '90 minutes of gushing about Helvetica',
  rating: 5
}
// this is OK because it was not declared as an Article type

const movieFive: Article = shopItem;
// this is okay because even though shopItem is an object of type ShopItem it has all of the
// properties and required types for an Article even though there is one extra property.

// Note event though movieFive works, movieThree fails because of the excess property check, this is because
// TypeScript thinks an explicit assignment of another property after declaring the object of a certain type
// is probably a developer error.

const missingProperties = {
  title: 'Helvetica',
  price: 6.66
}

const anotherMovie: Article = missingProperties; // in this case too few properties will flag an error,
// this makes sense

