import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/utility";
import { useUserData } from "../Contexts/userDataContext";
import { useAuth } from "./useAuth";

export const useUserActions = (setLoading) => {
  const navigate = useNavigate();
  const { isUserLoggedIn, userProfile } = useAuth();
  const { userData, userDispatch } = useUserData();

  const addToCart = async (_id, path) => {
    if (isUserLoggedIn && userProfile._id) {
      setLoading(true);
      const { data } = await axios.post(
        `${BASE_URL}/carts/add-item/${userProfile._id}/${_id}`
      );
      if (data.success) {
        userDispatch({ type: "ADD_TO_CART", payload: { product: _id } });
      }
      setLoading(false);
      return;
    }
    navigate("/login", {
      state: {
        from: path,
        message: "Login to add to cart",
        addTo: "cart",
        productId: _id,
      },
    });
  };

  const addToWishlist = async (_id, path) => {
    if (isUserLoggedIn && userProfile._id) {
      setLoading(true);
      const { data } = await axios.post(
        `${BASE_URL}/wishlists/add-item/${userProfile._id}/${_id}`
      );
      if (data.success) {
        userDispatch({ type: "ADD_TO_WISHLIST", payload: { product: _id } });
      }
      setLoading(false);
      return;
    }
    navigate("/login", {
      from: path,
      message: "Login to add to wishlist",
      addTo: "cart",
      productId: _id,
    });
  };

  const isAlreadyInWishlist = (_id) =>
    userData.wishlist.some((item) => item === _id);

  const isAlreadyInCart = (_id) =>
    userData.cart.some((item) => item.product === _id);

  const removeFromCart = async (_id) => {
    if (isUserLoggedIn && userProfile._id) {
      setLoading(true);
      const { data } = await axios.delete(
        `${BASE_URL}/carts/remove-item/${userProfile._id}/${_id}`
      );
      if (data.success) {
        userDispatch({ type: "REMOVE_FROM_CART", payload: { product: _id } });
      }
      setLoading(false);
      return;
    }
  };

  const removeFromWishlist = async (_id) => {
    if (isUserLoggedIn && userProfile._id) {
      setLoading(true);
      const { data } = await axios.delete(
        `${BASE_URL}/wishlists/remove-item/${userProfile._id}/${_id}`
      );
      if (data.success) {
        userDispatch({
          type: "REMOVE_FROM_WISHLIST",
          payload: { product: _id },
        });
      }
      setLoading(false);
      return;
    }
  };

  const incrementQuantity = async (_id, quantity) => {
    if (isUserLoggedIn && userProfile._id) {
      setLoading(true);
      const { data } = await axios.post(
        `${BASE_URL}/carts/update-quantity/${userProfile._id}`,
        {
          productId: _id,
          quantity: quantity + 1,
        }
      );
      if (data.success) {
        userDispatch({ type: "INCREMENT_QUANTITY", payload: { product: _id } });
      }
      setLoading(false);
      return;
    }
  };

  const decrementQuantity = async (_id, quantity) => {
    if (isUserLoggedIn && userProfile._id) {
      setLoading(true);
      const { data } = await axios.post(
        `${BASE_URL}/carts/update-quantity/${userProfile._id}`,
        {
          productId: _id,
          quantity: quantity - 1,
        }
      );
      if (data.success) {
        userDispatch({ type: "DECREMENT_QUANTITY", payload: { product: _id } });
      }
      setLoading(false);
      return;
    }
  };

  const moveToWishlistOnClick = async (_id) => {
    if (!isAlreadyInWishlist(_id)) {
      await addToWishlist(_id);
    }
    await removeFromCart(_id);
  };

  const handleOrderConfirm = async () => {
    if (isUserLoggedIn && userProfile._id) {
      setLoading(true);
      const { data } = await axios.post(
        `${BASE_URL}/carts/order/${userProfile._id}`
      );
      if (data.success) {
        userDispatch({ type: "EMPTY_CART" });
        navigate("/order-confirm", { replace: true });
      }
      setLoading(false);
    }
  };

  const handleCardPayment = async (token, cart) => {
    if (isUserLoggedIn && userProfile._id) {
      setLoading(true);
      const { data } = await axios.post(
        `${BASE_URL}/payment/${userProfile._id}`,
        {
          token,
          cart,
        }
      );
      if (data.success) {
        userDispatch({ type: "EMPTY_CART" });
        navigate("/order-confirm", { replace: true });
      }
      setLoading(false);
    }
  };

  return {
    addToCart,
    addToWishlist,
    isAlreadyInWishlist,
    isAlreadyInCart,
    removeFromCart,
    removeFromWishlist,
    decrementQuantity,
    incrementQuantity,
    moveToWishlistOnClick,
    handleCardPayment,
    handleOrderConfirm,
  };
};
