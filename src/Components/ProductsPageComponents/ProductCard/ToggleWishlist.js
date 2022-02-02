import { FaHeart } from "react-icons/fa";
import { useLocation } from "react-router";
import { useState } from "react";
import { useUserActions } from "../../../hooks/useUserActions";

export const ToggleWishlist = ({ productId }) => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const path = location.pathname + location.search;
  const { isAlreadyInWishlist, addToWishlist, removeFromWishlist } =
    useUserActions(setLoading);

  return isAlreadyInWishlist(productId) ? (
    <button
      disabled={loading}
      className="bg-red-200 flex justify-center items-center rounded-full p-2"
      aria-label="remove from wishlist"
      onClick={(e) => {
        e.stopPropagation();
        removeFromWishlist(productId);
      }}
    >
      <FaHeart className="text-red-500" />
    </button>
  ) : (
    <button
      disabled={loading}
      className="bg-gray-200 flex justify-center items-center rounded-full p-2"
      aria-label="add to wishlist"
      onClick={(e) => {
        e.stopPropagation();
        addToWishlist(productId, path);
      }}
    >
      <FaHeart />
    </button>
  );
};
