type Customer = {
  customerId: number,
  firstName: string,
  lastName: string
}

type Product = {
  productId: number,
  title: string,
  price: number
}

type Order = {
  orderId: number,
  customer: Customer,
  products: Product[],
  date: Date
}

let customer: Customer = {
  customerId: 1,
  firstName: 'Elmer',
  lastName: 'Fudd'
}

let product: Product = {
  productId: 1,
  title: 'The Well Grounded Rubyist',
  price: 30.00
}

let order: Order = {
  orderId: 1,
  customer: customer,
  products: [product],
  date: new Date('December 17, 1995 03:24:00')
}


/*
Our first function is a fetchOrder function:

in our ecommerce application we have the following requirements, (1) if we pass in a customer we get all of the
orders from this customer, (2) if we pass in a product, we get all of the orders that includes this product, and (3)
if we pass in an order id we get the order associated with that id.

Customer => Order[]
Product => Order[]
id => Order

we could do this with function overloads but there are too many possibilities to deal with, looking at the text
7 overloads for three possible input types and two output types, this is too much.
*/

/*
  What if we can map the union of input types to the appropriate output types?
*/

type FetchParams = number | Product | Customer;
type FetchReturn<Param extends FetchParams> =
  Param extends Customer ? Order[] :
  Param extends Product ? Order[] : Order
// so now we have a FetchReturn Type which can resolve the inputs and the outputs, if Param extends Customer we get
// an Order[], if Param extends Product then we get Order[], finally if a number is left we get Order


// we now extend the fetchOrder function to handle a callback.  We are going to be accessing a database so the
// function will have two implementations, one with no callback so it just gets one argument and returns a promise
// and with the return value, Order[] or Order, secondly it gets a callback and the callback takes what would
// be the result, Order[] or Order

function fetchOrder<Param extends FetchParams>(
  param: Param
): FetchReturn<Param>{
}

fetchOrder(customer);
fetchOrder(product);
fetchOrder(2);
// now we have the type of inputs defining what kind of outputs will appear

/*
  So the problem with trying to code up a version with Promises and one without is the parameter lists are
  different.  We see this below, in one case we use a tuple to pick out one parameter from the parameter list
  and in the second case we use another tuple of two elements to pick out two parameters from the parameter list.
*/

type Callback<Res> = (result: Res) => void;
function fetchOrderOne<Param extends FetchParams>(
  ...args: [Param]
): Promise<FetchParams<Param>> {

}

function fetchReturnTwo<Param extends FetchParams>(
  ...args: [Param, Callback<FetchReturn<Param>>]
): void {

}

/*
  So according to the book we can now have one final conditional that will combine all of the possible input
  types and their respective output types, in the case above we have a situation where on parameter set is just a
  number, customer object, or order object.  In the second case the parameters are either the number, customer, or
  order object and then the second parameter is a callback function.
*/

// Here are all the conditionals so far
/*
type FetchParams = number | Product | Customer;

type FetchReturn<Param extends FetchParams> =
  Param extends Customer ? Order[] :
  Param extends Product ? Order[] : Order

type Callback<Res> = (result: Res) => void; remember from above, this is the Callback function signature
*/

// we first make a small helper type to help with readability
type FetchCallback<T extends FetchParams> = Callback<FetchReturn<T>>;

// now we put everything together in one conditional which combines all of the conditionals and types listed above
type AsyncResult<FetchHead, Param extends FetchParams> =
  FetchHead extends [Param, FetchCallback<Param>] ? void :
  FetchHead extends [Param] ? Promise<FetchReturn<Param>> : never;
// so what is this conditional saying?  it is saying if FetchHead is a subtype of the tuple FetchParams and
// FetchCallback return void, otherwise if it is a subtype of just FetchParams return a Promise

// we can now rewrite fetchOrder
function fetchOrderThree<Param extends FetchParams, FetchHead>(
  [...args]: [FetchHead]
): AsyncResult<FetchHead, Param> {

}

// these deeply nested conditional types make for a difficult reading of code, we are better off making the code
// more explicit

// the first overload is just with a single input parameter which is number | Order | Customer
function fetchOrderFour<Param extends FetchParams>(
  input: Param
): Promise<FetchReturn<Param>>

// this is the second implementation, which takes two parameters, the first is the same as the previous
// implementation, the second parameter is a Callback which will have as an argument Order[] or Order
function fetchOrderFour<Param extends FetchParams>(
  input: Param,
  fn: Callback<FetchReturn<Param>>
): void

// implementation
function fetchOrderFour<Param extends FetchParams>(
  input: Param,
  fn?: Callback<FetchReturn<Param>>
): Promise<FetchReturn<Param>> | void {
  const result = fetch(`/backend?input=${JSON.stringify(input)}`).then(result => result.json());
  if (fn) {
    result.then(result => fn(result));
  } else {
    return result;
  }
}

type FetchByCustomer =
  Customer extends Customer ? Order[] :
  Customer extends Product ? Order[] : Order;

// we would have achieved the same result by type FetchCustomer = FetchReturn<Customer>, the point of both versions
// of the code above is that the first branch is always true a type will always extend itself so the return type
// is always Order[] in this case

// now let us see what happens when we apply conditionals over a union of types which is often called a
// distribution over a union.  type FetchByProductOrId = FetchReturn<Product | number>
// lets run through the conditional over each type => Product and number
type FetchByProductOrId =
  (
    Product extends Customer ? Order[] :
    Product extends Product ? Order[] : Order
  )
  |
  (
    number extends Customer ? Order[] :
    number extends Product ? Order[] : Order
  )

// we see that the result is always Order[] | Order because a Product will always extend a Product and a number
// never extends a Product or a Customer


