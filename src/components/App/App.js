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
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { checkToken } from "../../utils/auth";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ChangeProfileModal from "../ChangeProfileModal/ChangeProfileModal";

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
  const [user, setUser] = useState({}); // User object from the server [name, avatarUrl, email]
  const [loggedIn, setLoggedIn] = useState(false); // Used to track login status

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
    itemApi
      .getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  // Checks token validity
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((user) => {
          setUser(user);
          setLoggedIn(true);
        })
        .catch((err) => console.error(err));
    } else {
      setUser({});
      setLoggedIn(false);
    }
  }, [loggedIn]);

  /********************
   * HANDLE FUNCTIONS *
   ********************/

  // Like Button Handler
  const handleLikeClick = (_id, isLiked) => {
    // Check if this card is now liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        itemApi
          // the first argument is the card's id
          .addCardLike(_id)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((c) => (c._id === _id ? updatedCard : c))
            );
          })
          .catch((err) => console.error(err))
      : // if not, send a request to remove the user's id from the card's likes array
        itemApi
          // the first argument is the card's id
          .removeCardLike(_id)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((c) => (c._id === _id ? updatedCard : c))
            );
          })
          .catch((err) => console.error(err));
  };

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

  // Used when picture Modal opens
  const handleSetChangeProfile = () => {
    handleActiveModal("change-profile");
  };

  // Used when picture modal closes
  const handleUnsetActiveItem = () => {
    setActiveItem({});
    handleActiveModalEmpty();
  };

  // Function to toggle the temperature unit between Fahrenheit and Celsius.
  const handleToggleSwitchChange = () => {
    setCurrentTempUnit(currentTempUnit === "F" ? "C" : "F");
  };

  const handleAddItemSubmit = (item) => {
    itemApi
      .postItem(item)
      .then((res) => {
        setClothingItems([res, ...clothingItems]);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleDeleteItem = (deletedItem) => {
    itemApi
      .deleteItem(deletedItem)
      .then((res) => {
        setClothingItems(
          clothingItems.filter((item) => {
            return item !== deletedItem;
          })
        );
      })
      .catch((e) => {
        console.error(e);
      });
    handleActiveModalEmpty();
  };

  return (
    <CurrentUserContext.Provider value={user}>
      <div className="app">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTempUnit, handleToggleSwitchChange }}>
          <Header
            loggedIn={loggedIn}
            onHandleModal={handleActiveModal}
            location={location}
          />
          <Switch>
            <ProtectedRoute path="/profile" loggedIn={loggedIn}>
              <Profile
                temp={temp}
                onSetActiveImage={handleSetActiveItem}
                onHandleModal={handleActiveModal}
                clothingItems={clothingItems}
                setLoggedIn={setLoggedIn}
                openEditModal={handleSetChangeProfile}></Profile>
            </ProtectedRoute>

            <Route path="/">
              <Main
                weatherType={weatherType}
                temp={temp}
                onSetActiveImage={handleSetActiveItem}
                day={day}
                loading={loading}
                clothingItems={clothingItems}
                onCardLike={handleLikeClick}
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
          {/* Delete Item Modal */}
          {activeModal === "delete-item" && (
            <DeleteItemModal
              item={activeItem}
              onModalClose={handleUnsetActiveItem}
              onDelete={handleDeleteItem}></DeleteItemModal>
          )}
          {/* Sign Up Modal */}
          {activeModal === "sign-up" && (
            <RegisterModal
              setActiveModal={handleActiveModal}
              onClose={handleActiveModalEmpty}
              setLoggedIn={setLoggedIn}></RegisterModal>
          )}
          {/* Sign Up Modal */}
          {activeModal === "sign-in" && (
            <LoginModal
              onClose={handleActiveModalEmpty}
              setActiveModal={handleActiveModal}
              setLoggedIn={setLoggedIn}></LoginModal>
          )}
          {activeModal === "change-profile" && (
            <ChangeProfileModal
              onClose={handleActiveModalEmpty}
              handleUser={setUser}></ChangeProfileModal>
          )}
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
