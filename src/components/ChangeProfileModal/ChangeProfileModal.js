import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useContext } from "react";
import { updateProfile } from "../../utils/auth";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ChangeProfileModal({ onClose, handleUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatar);
  const [name, setName] = useState(currentUser.name);

  const handleAvatarUrlChange = (e) => {
    setAvatarUrl(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
          value={name}
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
          value={avatarUrl}
          onChange={handleAvatarUrlChange}
          required
        />
      </div>
    </ModalWithForm>
  );
}

export default ChangeProfileModal;
