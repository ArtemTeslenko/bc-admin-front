import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/assets/redux/";
import {
  CommonForm,
  CommonFieldWrapper,
  CommonFormLabel,
  CommonFormInput,
  CommonButtonPrimary,
} from "@/assets/styles";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [key, setKey] = useState("");

  function handleFormSubmit(e) {
    e.preventDefault();

    dispatch(login({ email, password, key }));

    setEmail("");
    setPassword("");
    setKey("");
  }

  return (
    <>
      <CommonForm onSubmit={handleFormSubmit}>
        <CommonFieldWrapper>
          <CommonFormLabel htmlFor="emailInput">Email</CommonFormLabel>
          <CommonFormInput
            type="text"
            name="email"
            id="emailInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </CommonFieldWrapper>
        <CommonFieldWrapper>
          <CommonFormLabel htmlFor="passwordInput">Password</CommonFormLabel>
          <CommonFormInput
            type="password"
            name="password"
            id="passwordInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </CommonFieldWrapper>
        <CommonFieldWrapper>
          <CommonFormLabel htmlFor="keyInput">Key</CommonFormLabel>
          <CommonFormInput
            type="text"
            name="key"
            id="keyInput"
            value={key}
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
