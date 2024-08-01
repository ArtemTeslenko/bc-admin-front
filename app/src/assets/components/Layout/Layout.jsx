import { Outlet } from "react-router-dom";
import { AuthNavigation } from "@/assets/components/AuthNavigation";
import { Sidebar } from "@/assets/components/Sidebar";
import { Header } from "@/assets/components/Header";
import { Main } from "@/assets/components/Main";
import { LayoutContainer, LayoutMainBox } from "@/assets/components/Layout";

export const Layout = () => {
  return (
    <>
      <LayoutContainer>
        <Sidebar />

        <LayoutMainBox>
          <Header>
            <AuthNavigation />
          </Header>

          <Main>
            <Outlet></Outlet>
          </Main>
        </LayoutMainBox>
      </LayoutContainer>
    </>
  );
};
