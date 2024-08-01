import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsLoggedIn } from "@/assets/redux";
import { IoLogOutOutline, IoLogInOutline } from "react-icons/io5";
import { BiUserPlus } from "react-icons/bi";
import { CommonButtonWithIcon, CommonNavButton } from "@/assets/styles";
import { commonButtonIcon } from "@/assets/utils";
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
          Logout
          <IoLogOutOutline style={commonButtonIcon} />
        </CommonButtonWithIcon>
      ) : (
        <NavLinksWrapper>
          <CommonNavButton to="/register" className="flex-center">
            <BiUserPlus style={commonButtonIcon} />
            Register
          </CommonNavButton>

          <CommonNavButton to="/login" className="flex-center">
            <IoLogInOutline style={commonButtonIcon} />
            Login
          </CommonNavButton>
        </NavLinksWrapper>
      )}
    </NavigationWrapper>
  );
};
