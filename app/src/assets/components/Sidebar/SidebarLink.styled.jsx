import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const SidebarLink = styled(NavLink)`
  font-size: 16px;
  text-decoration: none;
  color: #353535;
  transition: all 350ms cubic-bezier(0.075, 0.82, 0.165, 1);

  &:hover {
    text-decoration: underline;
  }

  &.active {
    color: #ed7979;
  }
`;
