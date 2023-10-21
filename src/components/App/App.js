import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import ForecastWeatherApi from "../util/ForecastWeatherApi";
import { useEffect, useState } from "react";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [activeItem, setActiveItem] = useState({});
  const [temp, setTemp] = useState(0);

  const forecastWeatherApi = new ForecastWeatherApi();

  useEffect(() => {
    forecastWeatherApi.getForecastWeather().then((weather) => {
      setTemp(Math.round(weather.main.temp));
    });
  });

  const handleActiveModal = (modalName) => {
    setActiveModal(modalName);
  };

  const handleActiveModalEmpty = () => {
    setActiveModal("");
  };

  const handleSetActiveItem = (item) => {
    setActiveItem(item);
    handleActiveModal("item");
  };

  const handleUnsetActiveItem = () => {
    setActiveItem({});
    handleActiveModalEmpty();
  };

  return (
    <div className="app">
      <Header onHandleModal={handleActiveModal} />
      <Main weatherTemp={temp} onSetActiveImage={handleSetActiveItem} />
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
          item={activeItem}
          onClose={handleUnsetActiveItem}></ItemModal>
      )}
    </div>
  );
}

export default App;
