import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const UsersTable = styled.table`
  width: 100%;
  margin-bottom: 20px;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.15);
  border-collapse: collapse;
  border-radius: 6px;
`;

export const TableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid #dadada;
  }
`;

export const TableHead = styled.th`
  width: fit-content;
  padding: 10px;
  text-align: start;
  font-size: 18px;

  &:last-child {
    width: 1%;
    white-space: nowrap;
  }
`;

export const TableData = styled.td`
  width: fit-content;
  padding: 10px;

  &.action {
    display: flex;
    gap: 10px;
  }

  &:last-child {
    width: 1%;
    white-space: nowrap;
  }
`;

export const TableNav = styled(NavLink)`
  font-size: 16px;
  color: #ffffff;
  background-color: #3e4649;
  padding: 10px;
  border-radius: 6px;
  text-decoration: none;
`;

export const TableButton = styled.button`
  font-size: 16px;
  color: #ffffff;
  background-color: #9e3c32;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
`;
