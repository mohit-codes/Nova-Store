import { FaHeart } from "react-icons/fa";
import { useLocation } from "react-router";
import { useState } from "react";
import { useUserActions } from "../../../hooks/useUserActions";

export const ToggleWishlistIcon = ({ productId }) => {
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

export const ToggleWishlistButton = ({ productId }) => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const path = location.pathname + location.search;
  const { isAlreadyInWishlist, addToWishlist, removeFromWishlist } =
    useUserActions(setLoading);

  return isAlreadyInWishlist(productId) ? (
    <button
      disabled={loading}
      className="py-2 px-3 rounded-sm border-2 font-semibold text-red-500"
      onClick={() => {
        removeFromWishlist(productId);
      }}
    >
      REMOVE FROM WISHLIST
    </button>
  ) : (
    <button
      disabled={loading}
      className="py-2 px-3 rounded-sm border-2 font-semibold"
      onClick={() => {
        addToWishlist(productId, path);
      }}
    >
      Add to wishlist
    </button>
  );
};
