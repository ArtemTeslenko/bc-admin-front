import styled from "styled-components";

export const CommonForm = styled.form`
  width: 100%;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.15);
`;

export const CommonFieldWrapper = styled.div`
  display: grid;
  grid-template-columns: 15% 1fr;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
`;

export const CommonFormLabel = styled.label`
  margin-right: 10px;
  font-size: 16px;
`;

export const CommonFormInput = styled.input`
  padding: 10px;
  font-size: 16px;
  box-shadow: inset 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  border-color: #bef8f8;
`;
