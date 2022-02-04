import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useUserActions } from "../../../hooks/useUserActions";

export const AddToCart = ({ productId, isInStock }) => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname + location.search;
  const { addToCart, isAlreadyInCart } = useUserActions(setLoading);

  return isAlreadyInCart(productId) ? (
    <button
      disabled={loading}
      className=" bg-black text-white font-semibold p-2 rounded-sm"
      onClick={(e) => {
        e.stopPropagation();
        navigate("/cart");
      }}
    >
      GO TO CART
    </button>
  ) : (
    <button
      disabled={loading || !isInStock}
      className=" bg-red-600 text-white font-semibold p-2 rounded-sm"
      onClick={(e) => {
        e.stopPropagation();
        addToCart(productId, path);
      }}
    >
      ADD TO CART
    </button>
  );
};
