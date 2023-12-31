import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";
import { signin } from "../../utils/auth";

function LoginModal({ onClose, setActiveModal, setLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loggedUser = await signin(email, password);
      localStorage.setItem("jwt", loggedUser.token);
      onClose();
      setLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
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
        <label className="form__label">Email</label>
        <input
          placeholder="Email"
          className="form__input-text"
          type="email"
          name="email"
          minLength={"1"}
          maxLength={"30"}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div className="form__item">
        <label className="form__label">Password</label>
        <input
          placeholder="Password"
          name="password"
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
