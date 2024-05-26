import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "@/assets/redux";

const RegisterPage = () => {
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
    <div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="nameInput">Name</label>
          <input
            type="text"
            name="name"
            id="nameInput"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="emailInput">Email</label>
          <input
            type="text"
            name="email"
            id="emailInput"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="passwordInput">Password</label>
          <input
            type="text"
            name="password"
            id="passwordInput"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="keyInput">Key</label>
          <input
            type="text"
            name="key"
            id="keyInput"
            onChange={(e) => setKey(e.target.value)}
          />
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default RegisterPage;
