import styled from "styled-components";

export const FiltersContainer = styled.div`
  margin-bottom: 20px;
`;

export const FieldForm = styled.form`
  display: grid;
  grid-template-columns: 2fr 5fr 1fr 3fr;
  grid-gap: 10px;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

export const FieldLabel = styled.label`
  //
`;

export const FieldInput = styled.input`
  padding: 10px;
  border-radius: 6px;
  box-shadow: inset 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
`;

export const FieldButton = styled.button`
  font-size: 14px;
  color: #ffffff;
  background-color: #3e4649;
  padding: 10px;
  border-radius: 6px;
  text-decoration: none;
`;
