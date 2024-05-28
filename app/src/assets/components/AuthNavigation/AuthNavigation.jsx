import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "@/assets/redux";
import { selectIsLoggedIn } from "@/assets/redux";

export const AuthNavigation = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <div>
      {isLoggedIn ? (
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <div style={{ display: "flex", gap: "10px" }}>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/login">Login</NavLink>
        </div>
      )}
    </div>
  );
};
