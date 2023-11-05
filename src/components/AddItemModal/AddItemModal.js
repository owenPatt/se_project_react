import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

function AddItemModal({ isOpen, onAddItem, onCloseModal }) {
  const [name, setName] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [tempType, setTempType] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "link") {
      setImageSrc(e.target.value);
    } else {
      setTempType(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      name: name,
      weather: tempType,
      link: imageSrc,
    };
    onAddItem(newItem);
    onCloseModal();
  };

  return (
    <ModalWithForm
      name={"add-garment"}
      title={"New garment"}
      buttonText={"Add garment"}
      onClose={onCloseModal}
      onSubmit={handleSubmit}>
      <div className="form__item">
        <p className="form__label">Name</p>
        <input
          placeholder="Name"
          className="form__input-text"
          type="text"
          name="name"
          minLength={"1"}
          maxLength={"30"}
          onChange={handleChange}
        />
      </div>
      <div className="form__item">
        <p className="form__label">Image</p>
        <input
          placeholder="Image"
          name="link"
          className="form__input-text"
          type="url"
          onChange={handleChange}
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
            onChange={handleChange}
          />
          <p className="form__label-radio">Hot</p>
        </label>
        <label className="form__radio">
          <input
            type="radio"
            name="tempRadio"
            value="warm"
            className="form__input-radio"
            onChange={handleChange}
          />
          <p className="form__label-radio">Warm</p>
        </label>
        <label className="form__radio">
          <input
            type="radio"
            name="tempRadio"
            value="cold"
            className="form__input-radio"
            onChange={handleChange}
          />
          <p className="form__label-radio">Cold</p>
        </label>
      </div>
    </ModalWithForm>
  );
}

export default AddItemModal;
