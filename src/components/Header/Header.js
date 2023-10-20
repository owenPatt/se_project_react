import "./Header.css";

function Header({ onHandleModal }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const location = "Swartz Creek";
  return (
    <div className="header">
      <div className="header__left-side">
        <img className="header__logo" src="/images/Logo.png" alt="Logo" />
        <p className="header__date">
          {currentDate}, {location}
        </p>
      </div>
      <div className="header__right-side">
        <p className="header__add-clothes" onClick={onHandleModal}>
          + Add clothes
        </p>
        <p className="header__name">Terrence Tegegne</p>
        <img src="/images/avatar.png" alt="Avatar" className="header__avatar" />
      </div>
    </div>
  );
}

export default Header;
