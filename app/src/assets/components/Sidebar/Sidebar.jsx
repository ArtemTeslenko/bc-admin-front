import { SidebarLink, SidebarContainer } from "@/assets/components/Sidebar";

export const Sidebar = () => {
  return (
    <SidebarContainer>
      <div>British camp</div>
      <div>
        <div>
          <SidebarLink to="/">Home</SidebarLink>
        </div>
        <div>
          <SidebarLink to="/students">Students</SidebarLink>
        </div>
        <div>
          <SidebarLink to="/users">Users</SidebarLink>
        </div>
      </div>
    </SidebarContainer>
  );
};
