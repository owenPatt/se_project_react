import "./Profile.css";
import { useHistory } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  temp,
  onSetActiveImage,
  onHandleModal,
  clothingItems,
  setLoggedIn,
  openEditModal,
  onCardLike,
}) {
  // Log out function
  const history = useHistory();

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/"); // Redirect to the main page
  };

  return (
    <div className="profile">
      <SideBar openEditModal={openEditModal} handleLogOut={handleLogOut} />
      <ClothesSection
        temp={temp}
        onSetActiveImage={onSetActiveImage}
        onHandleModal={onHandleModal}
        clothingItems={clothingItems}
        onCardLike={onCardLike}></ClothesSection>
    </div>
  );
}

export default Profile;
