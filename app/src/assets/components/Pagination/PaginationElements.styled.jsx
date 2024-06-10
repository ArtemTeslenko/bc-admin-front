import styled from "styled-components";

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PaginationButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const PaginationButton = styled.button`
  display: flex;
  align-items: center;
  padding: 6px;
  font-size: 14px;
  line-height: 1;
  background-color: transparent;
  border: 1px solid #aaaaaa;
  border-radius: 4px;
`;

export const PaginationCurrentPage = styled.span`
  display: flex;
  align-items: center;
  padding: 6px;
  font-size: 14px;
  line-height: 1;
  color: #ffffff;
  background-color: #aaaaaa;
  border: 1px solid #aaaaaa;
  border-radius: 4px;
`;

export const PaginationTotalContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const PaginationTotalText = styled.div`
  font-size: 14px;
`;
