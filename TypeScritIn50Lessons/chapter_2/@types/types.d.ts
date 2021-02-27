type Article = {
  title: string,
  price: number,
  vat: number,
  stock?: number,
  description?: string
}

type ShopItem = {
  title: string,
  price: number,
  vat: number,
  stock: number,
  description: string,
  rating: number
}

type Address = {
  city: string,
  zip: string,
  street: string,
  number: string
}

type Customer = {
  name: string,
  address: Address,
  dateOfBirth: date
}

type DefaultOrder = {
  articles: Article[],
  customer: Customer
}

export { Article, ShopItem, Address, Customer, DefaultOrder };