import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const CommonButtonFlexContainer = styled.div`
  display: flex;
  gap: 20px;

  &.right {
    justify-content: end;
  }
`;

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

  &.mb20 {
    margin-bottom: 20px;
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

  &.right {
    width: fit-content;
    margin-left: auto;
  }

  &.mb20 {
    margin-bottom: 20px;
  }
`;

export const CommonButtonToggler = styled.button`
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 16px;
  color: #ffffff;
  background-color: #3e4649;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;

  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

export const CommonButtonWithIcon = styled.button`
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 16px;
  color: #ffffff;
  background-color: #3e4649;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
`;
