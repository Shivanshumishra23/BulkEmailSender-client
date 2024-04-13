import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { isAuthenticated } from "./api";

export const Protected = () => {
  const location = useLocation();
  const isLoggedIn = isAuthenticated();

  return (
    <>
      {isLoggedIn?.token ? (
        <Outlet />
      ) : (
        <Navigate to="/" redirect="/" replace state={{ from: location }} />
      )}
    </>
  );
};
