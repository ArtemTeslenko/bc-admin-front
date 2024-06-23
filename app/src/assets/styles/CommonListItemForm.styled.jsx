import styled from "styled-components";

export const ListItemFormTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 18px;
`;

export const ListItemForm = styled.form`
  width: 100%;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.15);

  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

export const ListItemFieldsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(p) => (p.$columns ? p.$columns : 2)}, 1fr);
  gap: 20px;
  margin-bottom: 20px;
`;

export const ListItemFieldWrapperGrid = styled.div`
  display: grid;
  grid-template-columns: 20% 1fr;
  gap: 10px;
  align-items: center;
`;

export const ListItemFieldWrapper = styled.div`
  display: grid;
  grid-template-columns: 15% 1fr;
  gap: 10px;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

export const ListItemFormLabel = styled.label`
  margin-right: 10px;
  font-size: 16px;
`;

export const ListItemFormInput = styled.input`
  padding: 10px;
  font-size: 16px;
  box-shadow: inset 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  border-color: #bef8f8;
`;

export const InnerFormWrapper = styled.div`
  width: 100%;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 6px;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.15);
`;
