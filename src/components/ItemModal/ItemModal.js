import "./ItemModal.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const ItemModal = ({ item, onClose, onHandleModal }) => {
  const user = useContext(CurrentUserContext);

  const handleClickOff = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Checking if the current user is the owner of the current clothing item
  const isOwn = item.owner === user._id;

  // Creating a variable which you'll then set in `className` for the delete button
  const itemDeleteButtonClassName = `item__delete-button ${
    isOwn ? "" : "item__delete-button_hidden"
  }`;

  return (
    <div className={"item-modal"} onClick={handleClickOff}>
      <div className="item-modal__content">
        {/* Close button to close the modal */}
        <button
          type="button"
          onClick={onClose}
          className="item-modal__close"></button>
        <img
          src={item.imageUrl}
          alt={item.name}
          className="item-modal__picture"
        />
        <div className="item-modal__body">
          <div>
            <p className="item-modal__title">{item.name}</p>
            <p className="item-modal__description">Weather: {item.weather}</p>
          </div>
          <p
            className={`item-modal__delete-btn ${itemDeleteButtonClassName}`}
            onClick={() => {
              onHandleModal("delete-item");
            }}>
            Delete Item
          </p>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
