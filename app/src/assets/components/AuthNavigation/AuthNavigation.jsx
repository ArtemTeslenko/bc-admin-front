import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/assets/redux";
import { selectIsLoggedIn } from "@/assets/redux";
import { IoLogOutOutline } from "react-icons/io5";
import { CommonButtonWithIcon, CommonNavButton } from "@/assets/styles";
import {
  NavigationWrapper,
  NavLinksWrapper,
} from "@/assets/components/AuthNavigation";

export const AuthNavigation = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <NavigationWrapper>
      {isLoggedIn ? (
        <CommonButtonWithIcon type="button" onClick={handleLogout}>
          <span>Logout</span>
          <IoLogOutOutline />
        </CommonButtonWithIcon>
      ) : (
        <NavLinksWrapper>
          <CommonNavButton to="/register">Register</CommonNavButton>
          <CommonNavButton to="/login">Login</CommonNavButton>
        </NavLinksWrapper>
      )}
    </NavigationWrapper>
  );
};
