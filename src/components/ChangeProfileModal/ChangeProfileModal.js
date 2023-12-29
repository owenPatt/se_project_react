import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";
import { updateProfile } from "../../utils/auth";

function ChangeProfileModal({ onClose, handleUser }) {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [name, setName] = useState("");

  const handleAvatarUrlChange = (e) => {
    setAvatarUrl(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async () => {
    const newUser = await updateProfile(name, avatarUrl);
    handleUser(newUser);
    onClose();
  };

  return (
    <ModalWithForm
      name={"change-profile"}
      title={"Change profile data"}
      buttonText={"Save changes"}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <div className="form__item">
        <p className="form__label">Name</p>
        <input
          placeholder="Name"
          name="name"
          className="form__input-text"
          type="text"
          onChange={handleNameChange}
          required
        />
      </div>

      <div className="form__item">
        <p className="form__label">Avatar URL</p>
        <input
          placeholder="URL"
          name="avatarUrl"
          className="form__input-text"
          type="url"
          onChange={handleAvatarUrlChange}
          required
        />
      </div>
    </ModalWithForm>
  );
}

export default ChangeProfileModal;
