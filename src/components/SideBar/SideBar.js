// SideBar.js
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";

const SideBar = ({ openEditModal, handleLogOut }) => {
  const user = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__user">
        <img
          src={user.avatar ? user.avatar : "./images/avatar.png"}
          alt="Avatar"
          className="sidebar__avatar"
        />
        <p className="sidebar__name">{user.name ? user.name : "Loading..."}</p>
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
