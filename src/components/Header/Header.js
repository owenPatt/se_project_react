import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTempUnitContext";

function Header({ onHandleModal, location }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const rightSide = document.querySelector(".header__right-side");
  const handleExpand = () => {
    rightSide.classList.add("header__right-side_active");
  };

  const handleCollapse = () => {
    rightSide.classList.remove("header__right-side_active");
  };

  return (
    <div className="header">
      <div className="header__left-side">
        <img className="header__logo" src="./images/Logo.png" alt="Logo" />
        <p className="header__date">
          {currentDate}, {location}
        </p>
      </div>
      <div className="header__right-side">
        <ToggleSwitch />
        <p
          className="header__add-clothes"
          onClick={() => {
            onHandleModal("add-garment");
            handleCollapse();
          }}>
          + Add clothes
        </p>
        <div className="header__user">
          <p className="header__name">Terrence Tegegne</p>
          <img
            src="./images/avatar.png"
            alt="Avatar"
            className="header__avatar"
          />
        </div>
        <button className="header__close" onClick={handleCollapse}></button>
      </div>
      <img
        src="./images/collapseBtn.svg"
        alt="Collapse Button"
        className="header__open"
        onClick={handleExpand}
      />
    </div>
  );
}

export default Header;
