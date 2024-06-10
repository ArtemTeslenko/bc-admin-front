import styled from "styled-components";

export const SidebarContainer = styled.aside`
  width: 150px;
  flex-shrink: 0;
`;

export const SidebarFixed = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 150px;
  height: 100vh;
  padding: 20px;
  background: linear-gradient(
    45deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(196, 224, 222, 0.2049413515406162) 36%,
    rgba(184, 219, 209, 0.1993391106442577) 100%
  );
  border-right: 1px solid #dadada;
`;
