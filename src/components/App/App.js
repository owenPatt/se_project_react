import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function App() {
  return (
    <div className="app">
      <Header />
      <Main />
      <Footer />
      <ModalWithForm
        name={"add-garment"}
        title={"New garment"}
        buttonText={"Add garment"}>
        <div className="form__item">
          <p className="form__label">Name</p>
          <input placeholder="Name" className="form__input-text" type="text" />
        </div>
        <div className="form__item">
          <p className="form__label">Image</p>
          <input placeholder="Image" className="form__input-text" type="text" />
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
    </div>
  );
}

export default App;
