import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { useUserData } from "../Contexts/userDataContext";
import { BASE_URL } from "../utils/utility";

export const useAuthPersist = () => {
  const {
    isUserLoggedIn,
    setLoading,
    userProfile,
    setIsUserLoggedIn,
    setUserProfile,
  } = useAuth();
  const { userDispatch } = useUserData();

  useEffect(() => {
    if (isUserLoggedIn && userProfile?._id) {
      (async () => {
        const { data } = await axios.get(
          `${BASE_URL}/users/user-data/${userProfile._id}`
        );
        if (data.success) {
          userDispatch({
            type: "INITIALIZE_CART",
            payload: {
              cart: data.cart,
            },
          });
          userDispatch({
            type: "INITIALIZE_WISHLIST",
            payload: {
              wishlist: data.wishlist,
            },
          });
        }
      })();
    }
  }, [userProfile]);

  useEffect(() => {
    (() => {
      setLoading(true);
      const login = JSON.parse(localStorage.getItem("login"));
      const user = JSON.parse(localStorage.getItem("user"));
      const token = JSON.parse(localStorage.getItem("token"));
      if (login !== undefined && user !== undefined && token !== undefined) {
        setIsUserLoggedIn(login);
        setUserProfile(user);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    (() => {
      localStorage.setItem("login", isUserLoggedIn);
      localStorage.setItem("user", JSON.stringify(userProfile));
      setLoading(false);
    })();
  }, [isUserLoggedIn, userProfile]);
};
