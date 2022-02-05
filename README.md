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

## ScreenShots
![1](https://user-images.githubusercontent.com/40515852/152631622-78fa86e5-48aa-4801-ac90-9286909d0a60.png)

![2](https://user-images.githubusercontent.com/40515852/152631613-79b1cd26-5334-4ec7-a2a9-d0709413e0a7.png)

![3](https://user-images.githubusercontent.com/40515852/152631606-fccec577-ec73-4f48-93e4-5d3fa772d38e.png)

Made with 💛 
