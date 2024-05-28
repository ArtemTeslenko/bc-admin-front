import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: baseline;

  gap: 10px;

  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

export const Input = styled.input`
  padding: 5px;
  margin: 5px;
  border-radius: 10px;
  border: 0;
  cursor: pointer;
`;

export const Label = styled.label`
  color: green;
`;

export const InputWrapperToggle = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ToggleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  padding: 10px;
`;

export const AgeCalculator = styled.div`
  display: flex;
  margin: 10px;
`;
