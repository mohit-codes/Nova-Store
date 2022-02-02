import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Loading } from "./Loading";

const PrivateRoute = () => {
  const { isUserLoggedIn, loading } = useAuth();
  const location = useLocation();

  return loading ? (
    <Loading />
  ) : (
    <>
      {isUserLoggedIn ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location.pathname }} replace />
      )}
    </>
  );
};

export default PrivateRoute;
