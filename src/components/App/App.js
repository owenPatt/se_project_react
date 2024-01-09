// Import necessary CSS file for styling.
import "./App.css";
// Imports
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteItemModal from "../DeleteItemModal/DeleteItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Api from "../../utils/api";
import Profile from "../Profile/Profile";
import { useEffect, useState } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as auth from "../../utils/auth";
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
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F"); // Current temperature unit (Fahrenheit or Celsius)
  const [clothingItems, setClothingItems] = useState([]);
  const [user, setUser] = useState({}); // User object from the server [name, avatarUrl, email]
  const [loggedIn, setLoggedIn] = useState(false); // Used to track login status

  // Create an instance of the Api class
  const api = new Api();

  // Use the useEffect hook to fetch weather data when the component mounts.
  useEffect(() => {
    api
      .getForecastWeather()
      .then((weather) => {
        // Update state with weather data.
        setDay(api.getTime(weather));
        setTemp(Math.round(weather.main.temp));
        setWeatherType(api.getWeatherType(weather));
        setLocation(weather.name);
      })
      .catch(console.error)
      .finally(() => {
        // Set loading state to false when the data is fetched.
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    api
      .getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch(console.error);
  }, []);

  // Checks token validity
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((user) => {
          setUser(user);
          setLoggedIn(true);
        })
        .catch(console.error);
    } else {
      setUser({});
      setLoggedIn(false);
    }
  }, [loggedIn]);

  // Listens for the escape key to close modals
  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleModalClose();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  /********************
   * HANDLE FUNCTIONS *
   ********************/

  // Like Button Handler
  const handleLikeClick = (_id, isLiked) => {
    // Check if this card is now liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        api
          // the first argument is the card's id
          .addCardLike(_id)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((c) => (c._id === _id ? updatedCard : c))
            );
            return true;
          })
          .catch(console.error)
      : // if not, send a request to remove the user's id from the card's likes array
        api
          // the first argument is the card's id
          .removeCardLike(_id)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((c) => (c._id === _id ? updatedCard : c))
            );
            return true;
          })
          .catch(console.error);
  };

  // Opens modal that is given
  const handleActiveModal = (modalName) => {
    setActiveModal(modalName);
  };

  // Function to close the active modal dialog.
  const handleModalClose = () => {
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
    handleModalClose();
  };

  // Function to toggle the temperature unit between Fahrenheit and Celsius.
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  // Function to add a new item to the database
  const handleAddItemSubmit = (item) => {
    return api.postItem(item).then((res) => {
      setClothingItems([res, ...clothingItems]);
    });
  };

  // Function to delete an item from the database
  const handleDeleteItem = (deletedItem) => {
    api
      .deleteItem(deletedItem)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => {
            return item !== deletedItem;
          })
        );
        handleModalClose();
      })
      .catch(console.error);
  };

  // Function to update the user profile
  const handleUpdateUser = (newUser) => {
    auth
      .updateProfile(newUser.name, newUser.avatar)
      .then((newUser) => {
        setUser(newUser);
        handleModalClose();
      })
      .catch(console.error);
  };

  const handleLogin = (user) => {
    auth
      .signin(user.email, user.password)
      .then((loggedUser) => {
        localStorage.setItem("jwt", loggedUser.token);
        setLoggedIn(true);
        handleModalClose();
      })
      .catch(console.error);
  };

  const handleCreateUser = (user) => {
    auth
      .signup(user.name, user.avatarUrl, user.email, user.password)
      .then(() => {
        handleModalClose();
        auth.signin(user.email, user.password);
      })
      .then(() => handleLogin(user));
  };

  return (
    <CurrentUserContext.Provider value={user}>
      <div className="app">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
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
                openEditModal={handleSetChangeProfile}
                onCardLike={handleLikeClick}></Profile>
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
              onCloseModal={handleModalClose}
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
              onClose={handleModalClose}
              onSubmit={handleCreateUser}></RegisterModal>
          )}
          {/* Sign Up Modal */}
          {activeModal === "sign-in" && (
            <LoginModal
              onClose={handleModalClose}
              setActiveModal={handleActiveModal}
              onSubmit={handleLogin}></LoginModal>
          )}
          {activeModal === "change-profile" && (
            <ChangeProfileModal
              onClose={handleModalClose}
              onSubmit={handleUpdateUser}></ChangeProfileModal>
          )}
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
