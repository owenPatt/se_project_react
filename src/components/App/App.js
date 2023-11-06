// Import necessary CSS file for styling.
import "./App.css";
// Imports
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteItemModal from "../DeleteItemModal/DeleteItemModal";
import ItemModal from "../ItemModal/ItemModal";
import ForecastWeatherApi from "../../utils/ForecastWeatherApi";
import ItemApi from "../../utils/api";
import Profile from "../Profile/Profile";
import { useEffect, useState } from "react";
import CurrentTempUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";

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
  const [clothingItems, setClothingItems] = useState({});

  // Create an instance of the ForecastWeatherApi class.
  const forecastWeatherApi = new ForecastWeatherApi();

  // Create an instance of the ItemApi class
  const itemApi = new ItemApi();

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

  useEffect(() => {
    itemApi.getItems().then((items) => {
      setClothingItems(items);
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
    itemApi.postItem(item).then((res) => {
      setClothingItems([res, ...clothingItems]);
    });
  };

  const handleDeleteItem = (deletedItem) => {
    itemApi.deleteItem(deletedItem).then((res) => {
      setClothingItems(
        clothingItems.filter((item) => {
          return item !== deletedItem;
        })
      );
    });
    handleActiveModalEmpty();
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
            onClose={handleUnsetActiveItem}
            onHandleModal={handleActiveModal}></ItemModal>
        )}
        {/*  */}
        {activeModal === "delete-item" && (
          <DeleteItemModal
            item={activeItem}
            onClose={handleUnsetActiveItem}
            onDelete={handleDeleteItem}></DeleteItemModal>
        )}
      </CurrentTempUnitContext.Provider>
    </div>
  );
}

export default App;
