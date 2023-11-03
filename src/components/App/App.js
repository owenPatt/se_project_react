// Import necessary CSS file for styling.
import "./App.css";
// Import React components and libraries.
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import ForecastWeatherApi from "../../utils/ForecastWeatherApi";
import { useEffect, useState } from "react";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext";

// Define the main App component.
function App() {
  // State variables and their initial values.
  const [activeModal, setActiveModal] = useState("");
  const [activeItem, setActiveItem] = useState({}); // Manage the active item for the modals
  const [temp, setTemp] = useState(0);
  const [weatherType, setWeatherType] = useState("sunny");
  const [day, setDay] = useState(true);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("loading");
  const [currentTempUnit, setCurrentTempUnit] = useState("F"); // Current temperature unit (Fahrenheit or Celsius)

  // Create an instance of the ForecastWeatherApi class.
  const forecastWeatherApi = new ForecastWeatherApi();

  // Use the useEffect hook to fetch weather data when the component mounts.
  useEffect(() => {
    forecastWeatherApi
      .getForecastWeather()
      .then((weather) => {
        // Update state with weather data.
        setDay(forecastWeatherApi.getTime(weather));
        setTemp(Math.round(weather.main.temp));
        setWeatherType(forecastWeatherApi.getWeatherType(weather));
        setLocation(weather.name);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        // Set loading state to false when the data is fetched.
        setLoading(false);
      });
  }, []);

  /********************
   * HANDLE FUNCTIONS *
   ********************/

  // Opens modal that is given
  const handleActiveModal = (modalName) => {
    setActiveModal(modalName);
  };

  // Function to close the active modal dialog.
  const handleActiveModalEmpty = () => {
    setActiveModal("");
  };

  // Used when picture Modal opens
  const handleSetActiveItem = (item) => {
    setActiveItem(item);
    handleActiveModal("item");
  };

  // Used when picture modal closes
  const handleUnsetActiveItem = () => {
    setActiveItem({});
    handleActiveModalEmpty();
  };

  // Function to toggle the temperature unit between Fahrenheit and Celsius.
  const handleToggleSwitchChange = () => {
    currentTempUnit === "F" ? setCurrentTempUnit("C") : setCurrentTempUnit("F");
  };

  return (
    <div className="app">
      <CurrentTempUnitContext.Provider
        value={{ currentTempUnit, handleToggleSwitchChange }}>
        <Header onHandleModal={handleActiveModal} location={location} />
        <Main
          weatherType={weatherType}
          temp={temp}
          onSetActiveImage={handleSetActiveItem}
          day={day}
          loading={loading}
        />
        <Footer />

        {/* Garment Modal */}
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
        {/* Item/Picture Modal */}
        {activeModal === "item" && (
          <ItemModal
            item={activeItem}
            onClose={handleUnsetActiveItem}></ItemModal>
        )}
      </CurrentTempUnitContext.Provider>
    </div>
  );
}

export default App;
