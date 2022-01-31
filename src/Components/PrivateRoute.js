import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const { isUserLoggedIn } = useAuth();
  const location = useLocation();

  if (isUserLoggedIn) {
    return <Outlet />;
  }

  return <Navigate to="/login" state={{ from: location.pathname }} replace />;
};

export default PrivateRoute;
