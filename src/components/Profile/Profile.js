import "./Profile.css";
import displayItems from "../../utils/displayItems";
import getTempCategory from "../../utils/getTemperatureCategory";

function Profile({ temp, onSetActiveImage, onHandleModal, clothingItems }) {
  const tempCategory = getTempCategory(temp);
  return (
    <div className="profile">
      <div className="profile__user">
        <img
          src="./images/avatar.png"
          alt="Avatar"
          className="profile__avatar"
        />
        <p className="profile__name">Terrence Tegegne</p>
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
          {displayItems(tempCategory, onSetActiveImage, clothingItems)}
        </div>
      </div>
    </div>
  );
}

export default Profile;
