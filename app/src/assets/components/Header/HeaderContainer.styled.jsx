import styled from "styled-components";

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 150px;
  display: block;
  width: calc(100vw - 150px);
  padding: 10px 20px;
  z-index: 2;
  background: linear-gradient(
    225deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(245, 249, 248, 1) 36%,
    rgba(243, 248, 246, 1) 100%
  );
  border-bottom: 1px solid #dadada;
`;
