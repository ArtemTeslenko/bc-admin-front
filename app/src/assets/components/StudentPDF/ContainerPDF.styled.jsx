import styled from "styled-components";

export const PdfWrapper = styled.div`
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
`;

export const InputResultWrapper = styled.div`
  display: grid;
  grid-template-columns: 18% 1fr;
  gap: 10px;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

export const InputResultInfo = styled.p`
  font-size: 16px;
`;

export const InputResultAttantion = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #9e3c32;
`;
