import { useState } from "react";
import {
  AiOutlineCloseCircle,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { useUserActions } from "../../hooks/useUserActions";

export const CartItem = ({ item }) => {
  const [loading, setLoading] = useState(false);

  const {
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    moveToWishlistOnClick,
  } = useUserActions(setLoading);

  return (
    <div className="flex shadow-md rounded-sm p-3">
      <div className="flex flex-col items-center">
        <img
          src={item.product.image[0]}
          alt={item.product.name}
          className="h-36 p-1 object-contain"
        />
        <button
          className="bg-slate-200 rounded-md p-2 m-2 text-sm"
          disabled={loading}
          onClick={() => moveToWishlistOnClick(item.product._id)}
        >
          Move to wishlist
        </button>
      </div>
      <div className="flex flex-col w-80 mx-2 font-medium ml-auto">
        <button
          disabled={loading}
          aria-label="remove"
          className="ml-auto text-xl my-1 p-1"
          onClick={() => removeFromCart(item.product._id)}
        >
          <AiOutlineCloseCircle />
        </button>
        <p>{item.product.name}</p>
        <p className="my-2">{`₹${item.product.price.toLocaleString(
          "en-IN"
        )}`}</p>
        <div className="flex justify-evenly mt-4">
          <p> Quantity :</p>
          <button
            aria-label="decrease quantity"
            className="p-1 rounded-full"
            disabled={item.quantity === 1 || loading}
            onClick={() => decrementQuantity(item.product._id, item.quantity)}
          >
            <AiOutlineMinus />
          </button>
          <p>{item.quantity}</p>
          <button
            aria-label="increase quantity"
            className="p-1 rounded-full"
            disabled={loading}
            onClick={() => incrementQuantity(item.product._id, item.quantity)}
          >
            <AiOutlinePlus />
          </button>
        </div>
      </div>
    </div>
  );
};
