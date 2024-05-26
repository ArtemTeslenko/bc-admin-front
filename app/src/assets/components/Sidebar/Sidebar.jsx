import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "@/assets/redux";
import { SidebarLink, SidebarContainer } from "@/assets/components/Sidebar";
import logo from "../../images/logo_blue.svg";

export const Sidebar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <SidebarContainer>
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
            <div>
              <SidebarLink to="/users">Users</SidebarLink>
            </div>
          </>
        )}
      </div>
    </SidebarContainer>
  );
};
