import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(true);

  return (
    <AuthContext.Provider
      value={{
        isUserLoggedIn,
        setIsUserLoggedIn,
        userProfile,
        setUserProfile,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
