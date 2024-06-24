import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const NavLinkButton = styled(NavLink)`
  padding: 8px 12px;
  font-size: 16px;
  line-height: 1;
  color: #ffffff;
  text-decoration: none;
  background-color: #474747;
  border: none;
  border-radius: 6px;
  &:hover{
    cursor: pointer;
    transform: scale(1.1);
  }
`;
