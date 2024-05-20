import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "@/assets/redux";
import { SidebarLink, SidebarContainer } from "@/assets/components/Sidebar";

export const Sidebar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <SidebarContainer>
      <div>British camp</div>
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
