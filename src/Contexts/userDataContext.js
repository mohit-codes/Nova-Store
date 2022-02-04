import { createContext, useContext, useReducer } from "react";
import { userReducer } from "../reducers/userReducer";

export const userDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const initialState = {
    cart: [],
    wishlist: [],
  };

  const [userData, userDispatch] = useReducer(userReducer, initialState);
  return (
    <userDataContext.Provider value={{ userData, userDispatch }}>
      {children}
    </userDataContext.Provider>
  );
};

export const useUserData = () => useContext(userDataContext);
