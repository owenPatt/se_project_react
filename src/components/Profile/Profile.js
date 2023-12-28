import "./Profile.css";
import getTempCategory from "../../utils/getTemperatureCategory";
import ItemsList from "../ItemsList/ItemsList";
import { useHistory } from "react-router-dom";

function Profile({
  temp,
  onSetActiveImage,
  onHandleModal,
  clothingItems,
  setLoggedIn,
}) {
  const tempCategory = getTempCategory(temp);
  // Log out function
  const history = useHistory();

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/"); // Redirect to the main page
  };

  return (
    <div className="profile">
      <div className="profile__left-side">
        <div className="profile__user">
          <img
            src="./images/avatar.png"
            alt="Avatar"
            className="profile__avatar"
          />
          <p className="profile__name">Terrence Tegegne</p>
        </div>
        <p className="profile__log-out" onClick={handleLogOut}>
          Log Out
        </p>
      </div>
      <div className="profile__cards">
        <div className="profile__cards-header">
          <p className="profile__cards-text">Your Items</p>
          <p
            className="profile__add-garment"
            onClick={() => {
              onHandleModal("add-garment");
            }}>
            + Add clothes
          </p>
        </div>
        <div className="profile__cards-container">
          <ItemsList
            tempCategory={tempCategory}
            onSetActiveImage={onSetActiveImage}
            items={clothingItems}
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
