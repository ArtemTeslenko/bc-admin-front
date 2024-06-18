import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const CommonButtonPrimary = styled.button`
  display: block;
  font-size: 16px;
  color: #ffffff;
  background-color: #3e4649;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;

  &.right {
    margin-left: auto;
  }
`;

export const CommonButtonDanger = styled.button`
  display: block;
  font-size: 16px;
  color: #ffffff;
  background-color: #9e3c32;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
`;

export const CommonNavButton = styled(NavLink)`
  display: block;
  font-size: 16px;
  color: #ffffff;
  background-color: #3e4649;
  padding: 8px;
  border-radius: 6px;
  text-decoration: none;
`;
