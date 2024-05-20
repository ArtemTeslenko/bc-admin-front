import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/assets/redux/";

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
    <div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="emailInput">Email</label>
          <input
            type="text"
            name="email"
            id="emailInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="passwordInput">Password</label>
          <input
            type="password"
            name="password"
            id="passwordInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="keyInput">Key</label>
          <input
            type="text"
            name="key"
            id="keyInput"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
