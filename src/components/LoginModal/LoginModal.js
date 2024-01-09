import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

function LoginModal({ onClose, setActiveModal, onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  const redirectToRegister = () => {
    setActiveModal("sign-up");
  };

  return (
    <ModalWithForm
      name={"login"}
      title={"Log in"}
      buttonText={"Log in"}
      onClose={onClose}
      onSubmit={handleSubmit}
      secFunc="or Register"
      secFuncOnClick={redirectToRegister}>
      <div className="form__item">
        <label className="form__label" htmlFor="email">
          Email
        </label>
        <input
          placeholder="Email"
          className="form__input-text"
          type="email"
          name="email"
          id="email"
          value={email}
          minLength={"1"}
          maxLength={"30"}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div className="form__item">
        <label className="form__label" htmlFor="password">
          Password
        </label>
        <input
          placeholder="Password"
          id="password"
          name="password"
          value={password}
          className="form__input-text"
          type="password"
          onChange={handlePasswordChange}
          required
        />
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
