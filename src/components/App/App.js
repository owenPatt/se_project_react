// Import necessary CSS file for styling.
import "./App.css";
// Import React components and libraries.
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import ForecastWeatherApi from "../../utils/ForecastWeatherApi";
import Profile from "../Profile/Profile";
import { useEffect, useState } from "react";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import { defaultClothingItems } from "../../utils/constants";

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
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

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

  const handleAddItemSubmit = (item) => {
    setClothingItems([item, ...clothingItems]);
  };

  return (
    <div className="app">
      <CurrentTempUnitContext.Provider
        value={{ currentTempUnit, handleToggleSwitchChange }}>
        <Header onHandleModal={handleActiveModal} location={location} />
        <Switch>
          <Route path="/profile">
            <Profile
              temp={temp}
              onSetActiveImage={handleSetActiveItem}
              onHandleModal={handleActiveModal}
              clothingItems={clothingItems}
            />
          </Route>

          <Route path="/">
            <Main
              weatherType={weatherType}
              temp={temp}
              onSetActiveImage={handleSetActiveItem}
              day={day}
              loading={loading}
              clothingItems={clothingItems}
            />
          </Route>
        </Switch>
        <Footer />

        {/* Garment Modal */}
        {activeModal === "add-garment" && (
          <AddItemModal
            isOpen={true}
            onCloseModal={handleActiveModalEmpty}
            onAddItem={handleAddItemSubmit}></AddItemModal>
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
