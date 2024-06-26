import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "@/assets/redux";
import { TbHexagonLetterBFilled, TbHexagonLetterCFilled } from "react-icons/tb";
import { AiOutlineHome } from "react-icons/ai";
import { PiStudent } from "react-icons/pi";
import { FiUsers } from "react-icons/fi";
import { GoCalendar } from "react-icons/go";
import {
  SidebarLink,
  SidebarContainer,
  SidebarFixed,
  SidebarLinkWrapper,
} from "@/assets/components/Sidebar";
// import logo from "@/assets/images/logo_blue.svg";

export const Sidebar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const [isUsersRouteAvailable, setIsUsersRouteAvailable] = useState(false);
  const [isPeriodsRouteAvailable, setIsPeriodsRouteAvailable] = useState(false);

  useEffect(() => {
    if (isLoggedIn && user) {
      const isPeriodsAvailable =
        user.role?.includes("super-admin") || user.role.includes("admin");

      user.role?.includes("super-admin") && setIsUsersRouteAvailable(true);
      isPeriodsAvailable && setIsPeriodsRouteAvailable(true);
    }
  }, [isLoggedIn, user]);

  return (
    <SidebarContainer>
      <SidebarFixed>
        {/* <div style={{ marginTop: "-30px", marginBottom: "-20px" }}>
          <img src={logo} alt="Logo" width="100px" height="100px" />
        </div> */}
        <div style={{ width: "100%", height: "70px" }}>
          <TbHexagonLetterBFilled
            style={{
              position: "relative",
              width: "30px",
              height: "30px",
              top: "0",
              left: "30px",
              filter: "drop-shadow(-4px -4px 3px #85fd9d)",
            }}
          />
          <TbHexagonLetterCFilled
            style={{
              position: "relative",
              width: "30px",
              height: "30px",
              top: "22px",
              left: "14px",
              filter: "drop-shadow(4px 4px 3px #7abcfe)",
            }}
          />
        </div>

        <div>
          {isLoggedIn && (
            <>
              <SidebarLinkWrapper>
                <AiOutlineHome />
                <SidebarLink to="/">Home</SidebarLink>
              </SidebarLinkWrapper>
              <SidebarLinkWrapper>
                <PiStudent />
                <SidebarLink to="/students">Students</SidebarLink>
              </SidebarLinkWrapper>
              {isUsersRouteAvailable && (
                <SidebarLinkWrapper>
                  <FiUsers />
                  <SidebarLink to="/users">Users</SidebarLink>
                </SidebarLinkWrapper>
              )}
              {isPeriodsRouteAvailable && (
                <SidebarLinkWrapper>
                  <GoCalendar />
                  <SidebarLink to="/periods">Periods</SidebarLink>
                </SidebarLinkWrapper>
              )}
            </>
          )}
        </div>
      </SidebarFixed>
    </SidebarContainer>
  );
};
