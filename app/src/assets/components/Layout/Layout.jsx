import { Outlet } from "react-router-dom";
import { LocationSelect } from "@/assets/components/LocationSelect";
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
            <LocationSelect />
          </Header>
          <Main>
            <Outlet></Outlet>
          </Main>
        </LayoutMainBox>
      </LayoutContainer>
    </>
  );
};
