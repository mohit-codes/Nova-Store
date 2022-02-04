export const userReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, { product: action.payload.product, quantity: 1 }],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(
          (item) => item.product !== action.payload.product
        ),
      };
    case "ADD_TO_WISHLIST":
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload.product],
      };
    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (item) => item !== action.payload.product
        ),
      };
    case "INCREMENT_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product === action.payload.product
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case "DECREMENT_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product === action.payload.product
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    case "INITIALIZE_CART":
      return {
        ...state,
        cart: action.payload.cart || [],
      };
    case "INITIALIZE_WISHLIST":
      return {
        ...state,
        wishlist: action.payload.wishlist || [],
      };
    case "EMPTY_CART":
      return {
        ...state,
        cart: [],
      };
    case "ERASE":
      return {
        cart: [],
        wishlist: [],
      };
    default:
      break;
  }
};
