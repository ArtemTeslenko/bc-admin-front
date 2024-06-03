import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  selectIsgettingCurrent,
  selectIsLoggedIn,
  selectUser,
} from "@/assets/redux";

export const PrivateRoute = ({ children, redirectTo = "/", requiredRole }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsgettingCurrent);
  const user = useSelector(selectUser);
  const [isRouteAvailable, setIsRouteAvailable] = useState(true);
  const shouldRedirect = !isLoggedIn && !isRefreshing;

  useEffect(() => {
    if (user.name && requiredRole && !isRefreshing) {
      !user.role.includes(requiredRole) && setIsRouteAvailable(false);
    }
  }, [user, requiredRole]);

  return (
    <>
      {shouldRedirect ? (
        <Navigate to={redirectTo} />
      ) : (
        <>
          {!requiredRole || (requiredRole && isRouteAvailable) ? (
            children
          ) : (
            <Navigate to={"/"} />
          )}
        </>
      )}
    </>
  );
};
