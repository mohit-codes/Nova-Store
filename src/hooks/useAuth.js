import axios from "axios";
import { BASE_URL } from "../utils/utility";
import { useContext } from "react";
import { AuthContext } from "../Contexts/authContext";
import { useUserData } from "../Contexts/userDataContext";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const {
    isUserLoggedIn,
    setIsUserLoggedIn,
    userProfile,
    setUserProfile,
    loading,
    setLoading,
  } = useContext(AuthContext);

  const { userDispatch } = useUserData();
  const navigate = useNavigate();

  const logUserIn = async (email, password, addTo, redirectPath, productId) => {
    const { data } = await axios.post(`${BASE_URL}/users/login`, {
      email,
      password,
    });
    if (data.success) {
      if (addTo) {
        switch (addTo) {
          case "CART":
            {
              const { data } = await axios.get(
                `${BASE_URL}/users/user-data/${userProfile._id}`
              );
              if (data.cart.some(({ product }) => product === productId)) {
                break;
              }
              await axios.post(
                `${BASE_URL}/carts/add-item/${userProfile._id}/${productId}`
              );
            }
            break;
          case "WISHLIST":
            {
              const { data } = await axios.get(
                `${BASE_URL}/users/user-data/${userProfile._id}`
              );
              if (data.wishlist.some((product) => product === productId)) {
                break;
              }
              await axios.post(
                `${BASE_URL}/wishlists/add-item/${userProfile._id}/${productId}`
              );
            }
            break;

          default:
            break;
        }
      }
      setIsUserLoggedIn(true);
      setUserProfile(data.user);
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      if (redirectPath) {
        navigate(redirectPath, { replace: true });
        return;
      }
      navigate("/", { replace: true });
    }
    return false;
  };

  const signUpUser = async (
    { name, email, password },
    addTo,
    redirectPath,
    productId
  ) => {
    const { data } = await axios.post(`${BASE_URL}/users/signup`, {
      name,
      email,
      password,
    });
    if (data.success) {
      if (addTo) {
        switch (addTo) {
          case "CART":
            {
              const { data } = await axios.get(
                `${BASE_URL}/users/user-data/${userProfile._id}`
              );
              if (data.cart.some(({ product }) => product === productId)) {
                break;
              }
              await axios.post(
                `${BASE_URL}/carts/add-item/${userProfile._id}/${productId}`
              );
            }
            break;
          case "WISHLIST":
            {
              const { data } = await axios.get(
                `${BASE_URL}/users/user-data/${userProfile._id}`
              );
              if (data.wishlist.some((product) => product === productId)) {
                break;
              }
              await axios.post(
                `${BASE_URL}/wishlists/add-item/${userProfile._id}/${productId}`
              );
            }
            break;

          default:
            break;
        }
      }
      setIsUserLoggedIn(true);
      setUserProfile(data.user);
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      if (redirectPath) {
        navigate(redirectPath, { replace: true });
        return;
      }
      navigate("/", { replace: true });
    }
    return false;
  };

  const logUserOut = () => {
    setIsUserLoggedIn(false);
    userDispatch({ type: "ERASE" });
    setUserProfile({});
    localStorage.clear();
    navigate("/");
  };

  return {
    logUserIn,
    signUpUser,
    logUserOut,
    isUserLoggedIn,
    userProfile,
    loading,
    setLoading,
    setIsUserLoggedIn,
    setUserProfile,
  };
};
