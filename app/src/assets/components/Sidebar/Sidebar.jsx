import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "@/assets/redux";
import {
  SidebarLink,
  SidebarContainer,
  SidebarFixed,
} from "@/assets/components/Sidebar";
import logo from "@/assets/images/logo_blue.svg";

export const Sidebar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const [isUsersRouteAvailable, setIsUsersRouteAvailable] = useState(false);

  useEffect(() => {
    if (isLoggedIn && user) {
      user.role.includes("super-admin") && setIsUsersRouteAvailable(true);
    }
  }, [isLoggedIn, user]);

  return (
    <SidebarContainer>
      <SidebarFixed>
        <div style={{ marginTop: "-30px", marginBottom: "-20px" }}>
          <img src={logo} alt="Logo" width="100px" height="100px" />
        </div>
        <div>
          {isLoggedIn && (
            <>
              <div>
                <SidebarLink to="/">Home</SidebarLink>
              </div>
              <div>
                <SidebarLink to="/students">Students</SidebarLink>
              </div>
              {isUsersRouteAvailable && (
                <div>
                  <SidebarLink to="/users">Users</SidebarLink>
                </div>
              )}
            </>
          )}
        </div>
      </SidebarFixed>
    </SidebarContainer>
  );
};
