import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

function RegisterModal({ onClose, setActiveModal, onSubmit }) {
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAvatarUrlChange = (e) => {
    setAvatarUrl(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit({ email, avatarUrl, password, name });
  };

  const redirectToLogin = () => {
    setActiveModal("sign-in");
  };

  return (
    <ModalWithForm
      name={"register"}
      title={"Sign up"}
      buttonText={"Next"}
      onClose={onClose}
      onSubmit={handleSubmit}
      secFunc="or Log in"
      secFuncOnClick={redirectToLogin}>
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
          minLength={"1"}
          maxLength={"30"}
          onChange={handleEmailChange}
          value={email}
          required
        />
      </div>

      <div className="form__item">
        <label className="form__label" htmlFor="password">
          Password
        </label>
        <input
          placeholder="Password"
          name="password"
          id="password"
          className="form__input-text"
          type="password"
          onChange={handlePasswordChange}
          value={password}
          required
        />
      </div>

      <div className="form__item">
        <label className="form__label" htmlFor="name">
          Name
        </label>
        <input
          placeholder="Name"
          name="name"
          id="name"
          className="form__input-text"
          type="text"
          onChange={handleNameChange}
          value={name}
          required
        />
      </div>

      <div className="form__item">
        <label className="form__label" htmlFor="avatarUrl">
          Avatar URL
        </label>
        <input
          placeholder="URL"
          name="avatarUrl"
          id="avatarUrl"
          className="form__input-text"
          type="url"
          onChange={handleAvatarUrlChange}
          value={avatarUrl}
          required
        />
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
