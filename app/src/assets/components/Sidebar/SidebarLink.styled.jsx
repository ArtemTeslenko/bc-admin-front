import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const SidebarLinkWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

export const SidebarLink = styled(NavLink)`
  font-size: 18px;
  font-weight: 500;
  text-decoration: none;
  color: #353535;
  transition: all 350ms cubic-bezier(0.075, 0.82, 0.165, 1);

  &:hover,
  &.active {
    text-decoration: underline;
  }

  &.active {
    color: #ed7979;
  }
`;
