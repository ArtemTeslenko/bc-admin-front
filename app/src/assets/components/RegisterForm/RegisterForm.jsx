import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "@/assets/redux";
import {
  CommonForm,
  CommonFieldWrapper,
  CommonFormLabel,
  CommonFormInput,
  CommonButtonPrimary,
} from "@/assets/styles";

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [key, setKey] = useState("");

  function handleFormSubmit(e) {
    e.preventDefault();

    dispatch(register({ name, email, password, key }));

    setName("");
    setEmail("");
    setPassword("");
    setKey("");
  }

  return (
    <>
      <CommonForm onSubmit={handleFormSubmit}>
        <CommonFieldWrapper>
          <CommonFormLabel htmlFor="nameInput">Name</CommonFormLabel>
          <CommonFormInput
            type="text"
            name="name"
            id="nameInput"
            onChange={(e) => setName(e.target.value)}
          />
        </CommonFieldWrapper>
        <CommonFieldWrapper>
          <CommonFormLabel htmlFor="emailInput">Email</CommonFormLabel>
          <CommonFormInput
            type="text"
            name="email"
            id="emailInput"
            onChange={(e) => setEmail(e.target.value)}
          />
        </CommonFieldWrapper>
        <CommonFieldWrapper>
          <CommonFormLabel htmlFor="passwordInput">Password</CommonFormLabel>
          <CommonFormInput
            type="text"
            name="password"
            id="passwordInput"
            onChange={(e) => setPassword(e.target.value)}
          />
        </CommonFieldWrapper>
        <CommonFieldWrapper>
          <CommonFormLabel htmlFor="keyInput">Key</CommonFormLabel>
          <CommonFormInput
            type="text"
            name="key"
            id="keyInput"
            onChange={(e) => setKey(e.target.value)}
          />
        </CommonFieldWrapper>
        <CommonButtonPrimary className="right" type="submit">
          Send
        </CommonButtonPrimary>
      </CommonForm>
    </>
  );
};
