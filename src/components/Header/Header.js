import { useContext, useState, useRef } from "react";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({ onHandleModal, location, loggedIn }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const user = useContext(CurrentUserContext);

  const rightSideRef = useRef(null);

  const avatar = user.avatar ? user.avatar : "./images/default-avatar.png";
  const name = user.name ? user.name : "Loading...";
  const initial = user.avatar ? "" : name[0].toUpperCase();

  // Get the current date for header__date
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  // Functions to expand and collapse functions
  const handleExpand = () => {
    setIsExpanded(true);
    document.addEventListener("click", handleUnfocus);
  };
  const handleCollapse = () => {
    setIsExpanded(false);
    document.removeEventListener("click", handleUnfocus);
  };

  // Used to check when expander is unfocused
  const handleUnfocus = (e) => {
    if (
      e.target === rightSideRef.current ||
      rightSideRef.current.contains(e.target) ||
      e.target.classList.contains("header__open")
    ) {
      return;
    }
    handleCollapse();
  };

  return (
    <header className="header">
      {/* Left side of the header with logo and date. */}
      <div className="header__left-side">
        <Link to="/">
          <img className="header__logo" src="./images/Logo.png" alt="Logo" />
        </Link>
        <p className="header__date">
          {currentDate}, {location}
        </p>
      </div>
      {/* Right side of the header with various elements. */}
      <div
        className={`header__right-side ${
          isExpanded ? "header__right-side_active" : ""
        }`}
        ref={rightSideRef}>
        <ToggleSwitch />
        {/* Add Garment button */}
        {loggedIn ? (
          <div className="header__loggedIn">
            <p
              className="header__text-button"
              onClick={() => {
                onHandleModal("add-garment");
                handleCollapse();
              }}>
              + Add clothes
            </p>
            {/* User information section. */}
            <div className="header__user">
              <Link to="/profile" className="header__name">
                {user.name ? user.name : "Loading..."}
              </Link>
              <div
                className="header__avatar"
                style={{ backgroundImage: `url(${avatar})` }}
                data-initial={initial}
              />
            </div>
          </div>
        ) : (
          <div className="header__loggedOut">
            <p
              className="header__text-button"
              onClick={() => {
                onHandleModal("sign-up");
                handleCollapse();
              }}>
              Sign Up
            </p>
            <p
              className="header__text-button"
              onClick={() => {
                onHandleModal("sign-in");
                handleCollapse();
              }}>
              Log In
            </p>
          </div>
        )}
        {/* last two elements used for collapsing and expanding right-side */}
        <button className="header__close" onClick={handleCollapse}></button>
      </div>
      <img
        src="./images/collapseBtn.svg"
        alt="Collapse Button"
        className="header__open"
        onClick={handleExpand}
      />
    </header>
  );
}

// Export the Header component as the default export.
export default Header;
