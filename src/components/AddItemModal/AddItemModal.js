import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

function AddItemModal({ isOpen, onAddItem, onCloseModal }) {
  const [name, setName] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [tempType, setTempType] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageSrcChange = (e) => {
    setImageSrc(e.target.value);
  };

  const handleTempTypeChange = (e) => {
    setTempType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      name: name,
      weather: tempType,
      imageUrl: imageSrc,
    };
    onAddItem(newItem)
      .then(() => {
        onCloseModal();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <ModalWithForm
      name={"add-garment"}
      title={"New garment"}
      buttonText={"Add garment"}
      onClose={onCloseModal}
      onSubmit={handleSubmit}>
      <div className="form__item">
        <label className="form__label" htmlFor="name">
          Name
        </label>
        <input
          placeholder="Name"
          className="form__input-text"
          type="text"
          name="name"
          id="name"
          value={name}
          autoComplete="name"
          minLength={"1"}
          maxLength={"30"}
          onChange={handleNameChange}
          required
        />
      </div>
      <div className="form__item">
        <label className="form__label" htmlFor="image">
          Image
        </label>
        <input
          placeholder="Image"
          name="link"
          id="image"
          className="form__input-text"
          type="url"
          value={imageSrc}
          onChange={handleImageSrcChange}
          required
        />
      </div>
      <p className="form__label">Select the weather type:</p>
      <div className="form__item form__item_radio">
        <label className="form__radio">
          <input
            type="radio"
            name="tempRadio"
            value="hot"
            className="form__input-radio"
            onChange={handleTempTypeChange}
            required
          />
          <span className="form__label-radio">Hot</span>
        </label>
        <label className="form__radio">
          <input
            type="radio"
            name="tempRadio"
            value="warm"
            className="form__input-radio"
            onChange={handleTempTypeChange}
            required
          />
          <span className="form__label-radio">Warm</span>
        </label>
        <label className="form__radio">
          <input
            type="radio"
            name="tempRadio"
            value="cold"
            className="form__input-radio"
            onChange={handleTempTypeChange}
            required
          />
          <span className="form__label-radio">Cold</span>
        </label>
      </div>
    </ModalWithForm>
  );
}

export default AddItemModal;
