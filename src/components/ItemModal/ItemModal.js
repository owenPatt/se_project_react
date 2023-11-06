import "./ItemModal.css";

const ItemModal = ({ item, onClose, onHandleModal }) => {
  const handleClickOff = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

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
            className="item-modal__delete-btn"
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
