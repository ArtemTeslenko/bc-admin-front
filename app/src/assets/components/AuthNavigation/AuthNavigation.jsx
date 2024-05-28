import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsLoggedIn } from "@/assets/redux";
import { CommonButton, NavLinkButton } from "@/assets/reusable";
import { NavButtonsWrapper } from "@/assets/components/AuthNavigation";


export const AuthNavigation = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <div>
      {isLoggedIn ? (
        <NavButtonsWrapper>
                  <CommonButton type="button" onClick={handleLogout}>
          Logout
        </CommonButton>
        </NavButtonsWrapper>
      ) : (
        <NavButtonsWrapper>
          <NavLinkButton to="/register">Register</NavLinkButton>
          <NavLinkButton to="/login">Login</NavLinkButton>
        </NavButtonsWrapper>
      )}
    </div>
  );
};
