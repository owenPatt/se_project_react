import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ onHandleModal, location }) {
  // Get the current date for header__date
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  // Access the right-side element to handle expansion and collapse.
  const rightSide = document.querySelector(".header__right-side");

  // Functions to expand and collapse functions
  const handleExpand = () => {
    rightSide.classList.add("header__right-side_active");
    document.addEventListener("click", handleUnfocus);
  };
  const handleCollapse = () => {
    rightSide.classList.remove("header__right-side_active");
    document.removeEventListener("click", handleUnfocus);
  };

  // Used to check when expander is unfocused
  const handleUnfocus = (e) => {
    if (
      e.target === rightSide ||
      rightSide.contains(e.target) ||
      e.target.classList.contains("header__open")
    ) {
      return;
    }
    handleCollapse();
  };

  return (
    <div className="header">
      {/* Left side of the header with logo and date. */}
      <div className="header__left-side">
        <img className="header__logo" src="./images/Logo.png" alt="Logo" />
        <p className="header__date">
          {currentDate}, {location}
        </p>
      </div>
      {/* Right side of the header with various elements. */}
      <div className="header__right-side">
        <ToggleSwitch />
        {/* Add Garment button */}
        <p
          className="header__add-clothes"
          onClick={() => {
            onHandleModal("add-garment");
            handleCollapse();
          }}>
          + Add clothes
        </p>
        {/* User information section. */}
        <div className="header__user">
          <p className="header__name">Terrence Tegegne</p>
          <img
            src="./images/avatar.png"
            alt="Avatar"
            className="header__avatar"
          />
        </div>
        {/* last two elements used for collapsing and expanding right-side */}
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

// Export the Header component as the default export.
export default Header;
