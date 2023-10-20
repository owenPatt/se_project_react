import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { useState } from "react";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [activeImageSrc, setActiveImageSrc] = useState("");

  const handleActiveModalAddGarment = () => {
    setActiveModal("add-garment");
  };

  const handleActiveModalItem = () => {
    setActiveModal("item");
  };

  const handleActiveModalEmpty = () => {
    setActiveModal("");
  };

  const handleSetActiveImage = (imageSrc) => {
    setActiveImageSrc(imageSrc);
    handleActiveModalItem();
  };

  const handleUnsetActiveImage = () => {
    handleActiveModalEmpty();
  };

  return (
    <div className="app">
      <Header onHandleModal={handleActiveModalAddGarment} />
      <Main onSetActiveImage={handleSetActiveImage} />
      <Footer />
      {activeModal === "add-garment" && (
        <ModalWithForm
          name={"add-garment"}
          title={"New garment"}
          buttonText={"Add garment"}
          onClose={handleActiveModalEmpty}>
          <div className="form__item">
            <p className="form__label">Name</p>
            <input
              placeholder="Name"
              className="form__input-text"
              type="text"
              name="name"
              minLength={"1"}
              maxLength={"30"}
            />
          </div>
          <div className="form__item">
            <p className="form__label">Image</p>
            <input
              placeholder="Image"
              name="link"
              className="form__input-text"
              type="url"
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
              />
              <p className="form__label-radio">Hot</p>
            </label>
            <label className="form__radio">
              <input
                type="radio"
                name="tempRadio"
                value="warm"
                className="form__input-radio"
              />
              <p className="form__label-radio">Warm</p>
            </label>
            <label className="form__radio">
              <input
                type="radio"
                name="tempRadio"
                value="cold"
                className="form__input-radio"
              />
              <p className="form__label-radio">Cold</p>
            </label>
          </div>
        </ModalWithForm>
      )}
      {activeModal === "item" && (
        <ItemModal
          imageSrc={activeImageSrc}
          onClose={handleUnsetActiveImage}></ItemModal>
      )}
    </div>
  );
}

export default App;
