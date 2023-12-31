// SideBar.js
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";

const SideBar = ({ openEditModal, handleLogOut }) => {
  const user = useContext(CurrentUserContext);

  const avatar = user.avatar ? user.avatar : "./images/default-avatar.png";
  const name = user.name ? user.name : "Loading...";
  const initial = user.avatar ? "" : name[0].toUpperCase();

  return (
    <div className="sidebar__left-side">
      <div className="sidebar__user">
        <div
          className="sidebar__avatar"
          style={{ backgroundImage: `url(${avatar})` }}
          data-initial={initial}
        />
        <p className="sidebar__name">{name}</p>
      </div>
      <p className="sidebar__text-button" onClick={openEditModal}>
        Change profile data
      </p>
      <p className="sidebar__text-button" onClick={handleLogOut}>
        Log Out
      </p>
    </div>
  );
};

export default SideBar;
