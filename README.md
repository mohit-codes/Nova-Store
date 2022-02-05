# Nova Store
Nova Store is an e-commerce application that consists of products like TV, Mobile, Laptop, and SmartWatch.

## Technology Stack

- React - Reducer + Context
- Styling using Tailwind CSS v3
- Desktop, Tablet and Mobile view responsive
- React Router v6 for routing
- Express & Node for Backend REST API's [Repo Link](https://github.com/mohit-codes/nova-store--backend)
- MongoDB using mongoose for data storage

## Functionalities 

1. Products listing and detail

   - List of products - fetched via ExpressAPI
   - Product detail page
   - Wishlist button
   - Add to cart button
   - Increment/decrement quantity for products added to cart. (Go to cart)
   - Sort by Price (low to high and vice versa)
   - Filter and sort feature using query params.
   - Filters as follows:
     - Include "out of stock" products (Cannot be added to cart)
     - Show products tagged with fast delivery, free delivery 
     - Price range of products
     - Category wise filter

2. Cart

   - Cart item list
   - Remove item from cart
   - Increment/decrement item quantity on cart
   - Move from cart to wishlist
   - Total items present in the cart with the overall cost
   - Checkout to billing information
   - Payment integration using Stripe

3. Wishlist

   - Wishlist item list
   - Remove from wishlist
   - Move from wishlist to cart

4. Authentication using JWT
   - Login form - existing users
   - Private route - wishlist, cart, profile and checkout
   - Sign up - new users
   - Persist login state
   - Data stored on MongoDB

## Test user credentials

**Email:** test@test.com

**Password:** Test@123

**Demo card credentials:** 
 - Number : 4242 4242 4242 4242
 - MM/YY : 08/22
 - CVV: 222
